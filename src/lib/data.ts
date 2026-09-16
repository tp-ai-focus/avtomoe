import {
  and,
  arrayOverlaps,
  asc,
  avg,
  count,
  desc,
  eq,
  gte,
  ilike,
  inArray,
  lte,
  ne,
  or,
  sql,
} from "drizzle-orm";
import { db } from "@/db";
import { CATEGORIES as demoCategories, PRODUCTS as demoProducts, REVIEWS as demoReviews, SERVICES as demoServices } from "@/lib/mock-data";
import {
  categories,
  orderItems,
  orders,
  products,
  reviews,
  services,
  type Category,
  type Order,
  type OrderItem,
  type Product,
  type Review,
  type Service,
} from "@/db/schema";

export type WithRating<T> = T & { rating: { avg: number; count: number } };
export type ProductCard = WithRating<Product>;

// The design preview is useful without a configured PostgreSQL instance too.
// Production keeps using the database as soon as DATABASE_URL is supplied.
const isLocalPreview = !process.env.DATABASE_URL;

function demoRating(productId: number) {
  const rows = demoReviews.filter((review) => review.productId === productId);
  return {
    avg: rows.length ? rows.reduce((sum, review) => sum + review.rating, 0) / rows.length : 0,
    count: rows.length,
  };
}

function demoCards(items = demoProducts): ProductCard[] {
  return items.map((item) => ({ ...item, rating: demoRating(item.id) })) as unknown as ProductCard[];
}

async function attachRatings<T extends { id: number }>(rows: T[]): Promise<WithRating<T>[]> {
  if (rows.length === 0) return [];
  const ids = rows.map((r) => r.id);
  const stats = await db
    .select({
      productId: reviews.productId,
      avg: sql<number>`coalesce(avg(${reviews.rating}), 0)::float`,
      cnt: sql<number>`count(*)::int`,
    })
    .from(reviews)
    .where(inArray(reviews.productId, ids))
    .groupBy(reviews.productId);
  const map = new Map(stats.map((s) => [s.productId, { avg: s.avg, count: s.cnt }]));
  return rows.map((r) => ({ ...r, rating: map.get(r.id) ?? { avg: 0, count: 0 } }));
}

/* ---------------------------------- catalog --------------------------------- */

export type CatalogQuery = {
  cat?: string;
  q?: string;
  brand?: string[];
  make?: string[];
  min?: number;
  max?: number;
  sort?: string;
};

export async function getCatalog(params: CatalogQuery): Promise<{
  items: ProductCard[];
  category: Category | null;
}> {
  if (isLocalPreview) {
    const category = params.cat
      ? (demoCategories.find((item) => item.slug === params.cat) ?? null)
      : null;
    let items = demoProducts.filter((item) =>
      (!category || item.categoryId === category.id) &&
      (!params.brand?.length || params.brand.includes(item.brand)) &&
      (!params.make?.length || params.make.some((make) => item.makes.includes(make))) &&
      (params.min == null || item.price >= params.min) &&
      (params.max == null || item.price <= params.max) &&
      (!params.q || `${item.name} ${item.brand} ${item.sku}`.toLowerCase().includes(params.q.toLowerCase())),
    );
    return { items: sortProducts(demoCards(items), params.sort ?? "popular"), category: category as Category | null };
  }
  const conds = [];

  let category: Category | null = null;
  if (params.cat) {
    const found = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, params.cat))
      .limit(1);
    category = found[0] ?? null;
    if (category) conds.push(eq(products.categoryId, category.id));
  }
  if (params.brand && params.brand.length > 0) conds.push(inArray(products.brand, params.brand));
  if (params.make && params.make.length > 0) conds.push(arrayOverlaps(products.makes, params.make));
  if (typeof params.min === "number" && !Number.isNaN(params.min)) conds.push(gte(products.price, params.min));
  if (typeof params.max === "number" && !Number.isNaN(params.max)) conds.push(lte(products.price, params.max));
  if (params.q) {
    const needle = `%${params.q}%`;
    conds.push(
      or(ilike(products.name, needle), ilike(products.brand, needle), ilike(products.sku, needle)),
    );
  }

  const rows = await db
    .select()
    .from(products)
    .where(conds.length > 0 ? and(...conds) : undefined);

  const withRatings = await attachRatings(rows);
  const items = sortProducts(withRatings, params.sort ?? "popular");

  return { items, category };
}

function sortProducts(items: ProductCard[], sort: string): ProductCard[] {
  const list = [...items];
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "rating":
      return list.sort((a, b) => b.rating.avg - a.rating.avg || b.rating.count - a.rating.count);
    case "new":
      return list.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    default:
      return list.sort(
        (a, b) => b.rating.count - a.rating.count || b.rating.avg - a.rating.avg || a.price - b.price,
      );
  }
}

export type Facets = {
  categories: (Category & { count: number })[];
  brands: { name: string; count: number }[];
  makes: { key: string; count: number }[];
  price: { min: number; max: number };
};

export async function getFacets(): Promise<Facets> {
  if (isLocalPreview) {
    const brands = new Map<string, number>();
    const makes = new Map<string, number>();
    for (const item of demoProducts) {
      brands.set(item.brand, (brands.get(item.brand) ?? 0) + 1);
      for (const make of item.makes) makes.set(make, (makes.get(make) ?? 0) + 1);
    }
    return {
      categories: demoCategories.map((category) => ({
        ...category,
        count: demoProducts.filter((item) => item.categoryId === category.id).length,
      })) as Facets["categories"],
      brands: [...brands].map(([name, count]) => ({ name, count })).sort((a, b) => a.name.localeCompare(b.name)),
      makes: [...makes].map(([key, count]) => ({ key, count })).sort((a, b) => b.count - a.count),
      price: { min: Math.min(...demoProducts.map((item) => item.price)), max: Math.max(...demoProducts.map((item) => item.price)) },
    };
  }
  const [cats, rows] = await Promise.all([
    db.select().from(categories).orderBy(asc(categories.sort), asc(categories.id)),
    db
      .select({
        brand: products.brand,
        makes: products.makes,
        price: products.price,
        categoryId: products.categoryId,
      })
      .from(products),
  ]);

  const perCat = new Map<number, number>();
  const perBrand = new Map<string, number>();
  const perMake = new Map<string, number>();
  let min = Infinity;
  let max = 0;

  for (const r of rows) {
    perCat.set(r.categoryId, (perCat.get(r.categoryId) ?? 0) + 1);
    perBrand.set(r.brand, (perBrand.get(r.brand) ?? 0) + 1);
    for (const m of r.makes) perMake.set(m, (perMake.get(m) ?? 0) + 1);
    if (r.price < min) min = r.price;
    if (r.price > max) max = r.price;
  }

  return {
    categories: cats.map((c) => ({ ...c, count: perCat.get(c.id) ?? 0 })),
    brands: [...perBrand.entries()]
      .map(([name, cnt]) => ({ name, count: cnt }))
      .sort((a, b) => a.name.localeCompare(b.name)),
    makes: [...perMake.entries()]
      .map(([key, cnt]) => ({ key, count: cnt }))
      .sort((a, b) => b.count - a.count),
    price: { min: Number.isFinite(min) ? min : 0, max: max || 0 },
  };
}

/* --------------------------------- product ---------------------------------- */

export async function getProductBySlug(slug: string): Promise<
  | (WithRating<Product> & {
      category: Category;
      reviewList: Review[];
      ratingBars: { stars: number; count: number }[];
    })
  | null
> {
  if (isLocalPreview) {
    const product = demoProducts.find((item) => item.slug === slug);
    const category = product ? demoCategories.find((item) => item.id === product.categoryId) : null;
    if (!product || !category) return null;
    const reviewList = demoReviews.filter((review) => review.productId === product.id) as Review[];
    return {
      ...product,
      rating: demoRating(product.id),
      category: category as Category,
      reviewList,
      ratingBars: [5, 4, 3, 2, 1].map((stars) => ({ stars, count: reviewList.filter((review) => review.rating === stars).length })),
    } as unknown as Awaited<ReturnType<typeof getProductBySlug>>;
  }
  const found = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  const product = found[0];
  if (!product) return null;

  const [catRows, reviewList, statRows] = await Promise.all([
    db.select().from(categories).where(eq(categories.id, product.categoryId)).limit(1),
    db.select().from(reviews).where(eq(reviews.productId, product.id)).orderBy(desc(reviews.createdAt)),
    db
      .select({ rating: reviews.rating, cnt: sql<number>`count(*)::int` })
      .from(reviews)
      .where(eq(reviews.productId, product.id))
      .groupBy(reviews.rating),
  ]);

  const [rated] = await attachRatings([product]);
  const bars = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: statRows.find((s) => s.rating === stars)?.cnt ?? 0,
  }));

  return { ...rated, category: catRows[0], reviewList, ratingBars: bars };
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<ProductCard[]> {
  if (isLocalPreview) return demoCards(demoProducts.filter((item) => item.categoryId === product.categoryId && item.id !== product.id).slice(0, limit));
  const rows = await db
    .select()
    .from(products)
    .where(and(eq(products.categoryId, product.categoryId), ne(products.id, product.id)))
    .limit(limit);
  return attachRatings(rows);
}

export async function getFeaturedProducts(limit = 8): Promise<ProductCard[]> {
  if (isLocalPreview) return demoCards(demoProducts.filter((item) => item.isFeatured).slice(0, limit));
  const rows = await db
    .select()
    .from(products)
    .where(eq(products.isFeatured, true))
    .orderBy(asc(products.id))
    .limit(limit);
  return attachRatings(rows);
}

/* --------------------------------- services --------------------------------- */

export async function getServices(): Promise<Service[]> {
  if (isLocalPreview) return demoServices as Service[];
  return db.select().from(services).orderBy(asc(services.sort), asc(services.id));
}

/* ---------------------------------- orders ---------------------------------- */

export async function getOrderByCode(
  code: string,
): Promise<{ order: Order; items: OrderItem[] } | null> {
  if (isLocalPreview) return null;
  const found = await db.select().from(orders).where(eq(orders.code, code)).limit(1);
  const order = found[0];
  if (!order) return null;
  const items = await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.orderId, order.id))
    .orderBy(asc(orderItems.id));
  return { order, items };
}
