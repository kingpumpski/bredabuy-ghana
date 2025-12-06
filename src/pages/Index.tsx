import React from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import HeroCarousel from "@/components/home/HeroCarousel";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import DealsSection from "@/components/home/DealsSection";
import BrandShowcase from "@/components/home/BrandShowcase";
import TrustBadges from "@/components/home/TrustBadges";

const Index: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>BredaBuy - Ghana's Premier Online Shopping Platform</title>
        <meta
          name="description"
          content="Shop quality products across all industries in Ghana. Electronics, fashion, groceries, and more with fast delivery, secure payments, and 24/7 support."
        />
        <meta property="og:title" content="BredaBuy - Shop Ghana's Best" />
        <meta
          property="og:description"
          content="Discover authentic Ghanaian products and global brands at unbeatable prices."
        />
      </Helmet>
      <Layout>
        <HeroCarousel />
        <TrustBadges />
        <CategoryGrid />
        <FeaturedProducts />
        <DealsSection />
        <BrandShowcase />
      </Layout>
    </>
  );
};

export default Index;
