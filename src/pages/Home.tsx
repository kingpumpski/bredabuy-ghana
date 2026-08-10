import { Helmet } from "react-helmet-async";

import HeroCarousel from "@/components/home/HeroCarousel";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import DealsSection from "@/components/home/DealsSection";
import BrandShowcase from "@/components/home/BrandShowcase";
import TrustBadges from "@/components/home/TrustBadges";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>BredaBuy Ghana | Shop Online in Ghana</title>

        <meta
          name="description"
          content="Discover products from trusted Ghanaian sellers on BredaBuy Ghana. Shop electronics, fashion, beauty, home essentials and more."
        />

        <meta
          name="keywords"
          content="BredaBuy Ghana, online shopping Ghana, Ghana marketplace, ecommerce Ghana, buy online Ghana"
        />

        <meta
          property="og:title"
          content="BredaBuy Ghana | Your Ghanaian Digital Marketplace"
        />

        <meta
          property="og:description"
          content="Shop from trusted sellers across Ghana."
        />
      </Helmet>

      <main className="min-h-screen bg-background">

        {/* =====================================================
            HERO
            ===================================================== */}

        <section aria-label="BredaBuy Ghana marketplace">
          <HeroCarousel />
        </section>

        {/* =====================================================
            CATEGORIES
            ===================================================== */}

        <section
          className="container mx-auto px-4 py-10 md:py-14"
          aria-labelledby="categories-heading"
        >
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Shop by category
            </p>

            <h2
              id="categories-heading"
              className="mt-1 text-2xl font-bold tracking-tight md:text-3xl"
            >
              Find what you need
            </h2>

            <p className="mt-2 max-w-2xl text-muted-foreground">
              Explore popular categories from trusted sellers across Ghana.
            </p>
          </div>

          <CategoryGrid />
        </section>

        {/* =====================================================
            DEALS
            ===================================================== */}

        <section
          className="bg-muted/40 py-12 md:py-16"
          aria-labelledby="deals-heading"
        >
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Today's offers
              </p>

              <h2
                id="deals-heading"
                className="mt-1 text-2xl font-bold tracking-tight md:text-3xl"
              >
                Deals you don't want to miss
              </h2>
            </div>

            <DealsSection />
          </div>
        </section>

        {/* =====================================================
            FEATURED PRODUCTS
            ===================================================== */}

        <section
          className="container mx-auto px-4 py-12 md:py-16"
          aria-labelledby="featured-heading"
        >
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Featured
              </p>

              <h2
                id="featured-heading"
                className="mt-1 text-2xl font-bold tracking-tight md:text-3xl"
              >
                Popular products
              </h2>

              <p className="mt-2 text-muted-foreground">
                Discover products customers are loving right now.
              </p>
            </div>
          </div>

          <FeaturedProducts />
        </section>

        {/* =====================================================
            BRANDS
            ===================================================== */}

        <section
          className="border-y bg-muted/20 py-12 md:py-16"
          aria-labelledby="brands-heading"
        >
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Trusted brands
              </p>

              <h2
                id="brands-heading"
                className="mt-1 text-2xl font-bold tracking-tight md:text-3xl"
              >
                Shop trusted brands
              </h2>
            </div>

            <BrandShowcase />
          </div>
        </section>

        {/* =====================================================
            TRUST
            ===================================================== */}

        <section
          className="container mx-auto px-4 py-12 md:py-16"
          aria-labelledby="trust-heading"
        >
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Why BredaBuy?
            </p>

            <h2
              id="trust-heading"
              className="mt-1 text-2xl font-bold tracking-tight md:text-3xl"
            >
              Shopping made easier
            </h2>

            <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
              A marketplace designed around convenient shopping,
              trusted sellers and reliable delivery across Ghana.
            </p>
          </div>

          <TrustBadges />
        </section>

      </main>
    </>
  );
};

export default Home;
