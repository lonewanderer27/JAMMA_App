import '../App.css'
import "react-image-gallery/styles/css/image-gallery.css";
import "../assets/styles/home.css";

import {
  Box,
  Flex,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import ImageGallery, { ReactImageGalleryProps } from "react-image-gallery";

import CategoryCard from "../components/CategoryCard";
import { Product } from "../types/jamma";
import Superchats from "../components/Superchats";
import XsProductCardGrid from "../components/ProductCards/XsProductCardGrid";
import { useNewProducts } from "../hooks/products";

export default function Home() {
  // const { data: products, isLoading, error } = useProducts();
  document.title = "JAMMA";

  const mainSlideshowImages = [
    {
      original:
        "https://snivqgzdabtawqfgptyd.supabase.co/storage/v1/object/public/home_slideshow/Best%20Sports%20Accessories.jpg",
    },
    {
      original:
        "https://snivqgzdabtawqfgptyd.supabase.co/storage/v1/object/public/home_slideshow/SpringGymBagEssentials-BLOG.webp",
    },
    {
      original:
        "https://snivqgzdabtawqfgptyd.supabase.co/storage/v1/object/public/home_slideshow/5d9383a02e22af607a7185d2.webp",
    },
    {
      original:
        "https://snivqgzdabtawqfgptyd.supabase.co/storage/v1/object/public/home_slideshow/9-Adobe-CC-All-Apps.png.webp?t=2023-07-12T15%3A19%3A36.912Z",
    },
  ];

  const giveawaySlideshowImages = [
    {
      original:
        "https://snivqgzdabtawqfgptyd.supabase.co/storage/v1/object/public/superchats/slideshow/Giveaway_Alert.png?t=2023-07-13T15%3A58%3A16.937Z",
    },
    {
      original:
        "https://snivqgzdabtawqfgptyd.supabase.co/storage/v1/object/public/superchats/slideshow/Giveaway_Instructions.mp4?t=2023-07-13T15%3A59%3A54.494Z",
      renderItem: () => (
        <video
          autoPlay={true}
          loop={true}
          src="https://snivqgzdabtawqfgptyd.supabase.co/storage/v1/object/public/superchats/slideshow/Giveaway_Instructions.mp4?t=2023-07-13T15%3A59%3A54.494Z"
        />
      ),
    },
  ];

  const categories = [
    {
      title: "Earphone",
      url: "/earphone",
      avatar_url:
        "https://snivqgzdabtawqfgptyd.supabase.co/storage/v1/object/public/icons/airpods.png?t=2023-07-13T14%3A35%3A13.946Z",
    },
    {
      title: "Smartwatch",
      url: "/smartwatch",
      avatar_url:
        "https://snivqgzdabtawqfgptyd.supabase.co/storage/v1/object/public/icons/smartwatch.png?t=2023-07-13T14%3A36%3A18.841Z",
    },
    {
      title: "Accessory",
      url: "/accessory",
      avatar_url:
        "https://snivqgzdabtawqfgptyd.supabase.co/storage/v1/object/public/icons/pencil.png?t=2023-07-13T14%3A36%3A27.566Z",
    },
    {
      title: "Headphone",
      url: "/headphone",
      avatar_url:
        "https://snivqgzdabtawqfgptyd.supabase.co/storage/v1/object/public/icons/headphones.png?t=2023-07-13T14%3A36%3A04.061Z",
    },
    {
      title: "Softwares",
      url: "/softwares",
      avatar_url:
        "https://snivqgzdabtawqfgptyd.supabase.co/storage/v1/object/public/products/softwares/photoshop.png?t=2023-07-13T14%3A36%3A47.852Z",
    },
  ];

  const mainSlideshowProps: ReactImageGalleryProps = {
    items: mainSlideshowImages,
    showFullscreenButton: false,
    showThumbnails: false,
    slideInterval: 3000,
    autoPlay: true,
    infinite: true,
  };

  const giveawaySlideshowProps: ReactImageGalleryProps = {
    items: giveawaySlideshowImages,
    showThumbnails: false,
    showFullscreenButton: false,
    slideInterval: 7000,
    autoPlay: true,
    infinite: true,
  };

  const { earphones, smartwatch } = useNewProducts();

  return (
    <Box paddingX="100px" paddingY="20px">
      <VStack gap={2} width="100%">
        <SimpleGrid columns={{ base: 1, xl: 3 }} width="100%">
          <GridItem colSpan={2} width="100%">
            <ImageGallery {...mainSlideshowProps} />
          </GridItem>
          <GridItem>
            <Flex flexDir={"column"}>
              <Image
                style={{ height: "200px", objectFit: "cover" }}
                src="https://snivqgzdabtawqfgptyd.supabase.co/storage/v1/object/public/home_slideshow/Headphone%20Banner.jpg"
              />
              <Image
                style={{ height: "200px", objectFit: "cover" }}
                src="https://snivqgzdabtawqfgptyd.supabase.co/storage/v1/object/public/home_slideshow/Smartwatch%20Banner%202.jpg"
              />
            </Flex>
          </GridItem>
        </SimpleGrid>
        <VStack width="100%">
          <Flex justifyContent={"left"} width="100%">
            <Heading size="sm">CATEGORIES</Heading>
          </Flex>
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, xl: 5 }}
            gap={3}
            width="100%"
          >
            {categories.map((item) => (
              <CategoryCard
                title={item.title}
                url={item.url}
                image={item.avatar_url}
              />
            ))}
          </SimpleGrid>
        </VStack>
        <VStack width="100%">
          <Flex justifyContent={"left"} width="100%">
            <Heading size="sm">NEW ARRIVALS</Heading>
          </Flex>
          <SimpleGrid columns={{ base: 2 }} gap={2}>
            <XsProductCardGrid
              products={earphones.data as unknown as Product[]}
            />
            <XsProductCardGrid
              products={smartwatch.data as unknown as Product[]}
            />
          </SimpleGrid>
        </VStack>
        <SimpleGrid columns={{ base: 1, xl: 3 }} width="100%" my="5">
          <GridItem>
            <ImageGallery {...giveawaySlideshowProps} />
          </GridItem>
          <GridItem colSpan={2} width="100%">
            <Superchats marginTop={"5"} />
          </GridItem>
        </SimpleGrid>
      </VStack>
    </Box>
  );
}