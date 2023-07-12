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

import CategoryCard from "../components/CategoryCard";
import ImageGallery from "react-image-gallery";

export default function Home() {
  // const { data: products, isLoading, error } = useProducts();
  document.title = "JAMMA";

  const images = [
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

  const categories = [
    {
      title: "Earphone",
      url: "/earphone",
    },
    {
      title: "Smartwatch",
      url: "/smartwatch",
    },
    {
      title: "Accessory",
      url: "/accessory",
    },
    {
      title: "Headphone",
      url: "/headphone",
    },
    {
      title: "Softwares",
      url: "/softwares",
    },
  ];

  const ImageGalleryProps = {
    items: images,
    showPlayButton: false,
    showFullscreenButton: false,
    showThumbnails: false,
    slideInterval: 1000,
  };

  return (
    <Box paddingX="20px" paddingY="20px">
      <VStack gap={2}>
        <SimpleGrid columns={{ base: 1, xl: 3 }}>
          <GridItem colSpan={2}>
            <ImageGallery {...ImageGalleryProps} />
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
        <VStack>
          <Flex justifyContent={"left"} width="100%">
            <Heading size="sm">CATEGORIES</Heading>
          </Flex>
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, xl: 5 }}
            gap={3}
            width="100%"
          >
            {categories.map((item) => (
              <CategoryCard title={item.title} url={item.url} />
            ))}
          </SimpleGrid>
        </VStack>
      </VStack>
    </Box>
  );
}