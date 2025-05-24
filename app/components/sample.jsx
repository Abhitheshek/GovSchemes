'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Box, Container, Heading, SimpleGrid, Text, useColorModeValue, 
  Card, CardBody, Image, Flex, Button, Icon, 
  VStack, HStack, Badge, Divider, useBreakpointValue,
  chakra, SlideFade, ScaleFade, Fade, useDisclosure,
  Tooltip, keyframes, Grid, GridItem
} from '@chakra-ui/react';
import { ChevronRightIcon, SearchIcon, StarIcon, ArrowForwardIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';


const MotionBox = motion(chakra.div);
const MotionFlex = motion(chakra.div);
const MotionCard = motion(Card);
const MotionBadge = motion(Badge);

export default function Home() {
  const [isSchemaFinderOpen, setIsSchemaFinderOpen] = useState(false);
  const [isSchemeDetailsOpen, setIsSchemeDetailsOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const scrollRef = useRef(false);
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
  
  useEffect(() => {
    const handleScroll = () => {
      // Throttle scroll events to prevent excessive re-renders
      if (!window.requestAnimationFrame) {
        setScrollY(window.scrollY);
        return;
      }
      
      if (!scrollRef.current) {
        scrollRef.current = true;
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          scrollRef.current = false;
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Trigger animation once after page load
    onToggle();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const cardHoverBg = useColorModeValue('gray.50', 'gray.700');
  const headingSize = useBreakpointValue({ base: "xl", md: "2xl" });
  
  // Featured schemes to display on homepage
  const featuredSchemes = [
    { id: "pm-kisan", category: "agriculture", name: "PM-KISAN", description: "Income support for farmers", icon: "🌾" },
    { id: "ayushman-bharat", category: "health", name: "Ayushman Bharat", description: "Healthcare for all", icon: "🏥" },
    { id: "pmay-urban", category: "housing", name: "PM Awas Yojana", description: "Housing for urban poor", icon: "🏙️" }
  ];
  
  const handleSchemeClick = (scheme) => {
    setSelectedScheme({
      id: scheme.id,
      category: scheme.category,
      level: 'national'
    });
    setIsSchemeDetailsOpen(true);
  };

  return (
    <Box overflowX="hidden">
      {/* Hero Section */}
      <Box 
        position="relative"
        height={{ base: "100vh", md: "90vh" }}
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
      >
        {/* Background with advanced parallax effect */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bgGradient="linear(to-br, blue.700, purple.800)"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          zIndex="-1"
          _after={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z\' fill=\'%23FFFFFF\' fill-opacity=\'0.05\'/%3E%3C/svg%3E")',
            opacity: 0.8,
            zIndex: 0
          }}
        />
        
        {/* Animated particles */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          opacity="0.4"
          className="particles-container"
          zIndex="0"
        />
        
        {/* Animated shapes with glow effects */}
        <MotionBox
          position="absolute"
          top="10%"
          left="5%"
          width="300px"
          height="300px"
          borderRadius="full"
          bg="rgba(255,255,255,0.03)"
          boxShadow="0 0 80px 20px rgba(138, 75, 255, 0.2)"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 2, delay: 0.2, ease: "easeInOut" }}
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
        
        <MotionBox
          position="absolute"
          bottom="10%"
          right="5%"
          width="250px"
          height="250px"
          borderRadius="full"
          bg="rgba(255,255,255,0.02)"
          boxShadow="0 0 60px 15px rgba(66, 153, 225, 0.25)"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: -360 }}
          transition={{ duration: 2.5, delay: 0.4, ease: "easeInOut" }}
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        />
        
        <MotionBox
          position="absolute"
          top="40%"
          right="15%"
          width="150px"
          height="150px"
          borderRadius="full"
          bg="rgba(255,255,255,0.04)"
          boxShadow="0 0 40px 10px rgba(237, 100, 166, 0.2)"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 2, delay: 0.6, times: [0, 0.7, 1] }}
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
        
        {/* Additional floating elements */}
        <MotionBox
          position="absolute"
          top="25%"
          left="20%"
          width="80px"
          height="80px"
          borderRadius="20px"
          bg="rgba(255,255,255,0.03)"
          boxShadow="0 0 20px 5px rgba(255, 255, 255, 0.1)"
          initial={{ y: -20, opacity: 0, rotate: 0 }}
          animate={{ y: 0, opacity: 1, rotate: 45 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{ transform: `translateY(${Math.sin(Date.now() / 1000) * 10}px)` }}
        />
        
        {/* Content */}
        <Container maxW="container.xl" position="relative" zIndex="1">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <VStack spacing={6} align="center" textAlign="center">
              <MotionBox
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Heading 
                  as="h1" 
                  size={headingSize} 
                  fontWeight="extrabold"
                  bgGradient="linear(to-r, white, blue.100)"
                  bgClip="text"
                  letterSpacing="tight"
                  textShadow="0 2px 15px rgba(0,0,0,0.4)"
                  className="glowing-text"
                >
                  Indian Government Schemes
                </Heading>
              </MotionBox>
              
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Text 
                  fontSize={{ base: "lg", md: "xl" }} 
                  maxW="700px"
                  color="whiteAlpha.900"
                  textShadow="0 1px 8px rgba(0,0,0,0.3)"
                >
                  Discover and access government welfare programs designed to empower citizens and improve quality of life
                </Text>
              </MotionBox>
              
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <HStack spacing={4} mt={6}>
                  
                <Link href="/schema" passHref>

                  <Button 
                    leftIcon={<SearchIcon />} 
                    colorScheme="whiteAlpha" 
                    variant="solid" 
                    _hover={{ 
                      transform: "translateY(-3px)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
                    }}
                    size="lg"
                    borderRadius="full"
                    px={8}
                    transition="all 0.3s"
                    
                  >
                    Find Schemes
                  </Button>
                  </Link>
                  
                  <Link href="/schema-finder" passHref>
                    <Button 
                      rightIcon={<ArrowForwardIcon />} 
                      bgGradient="linear(to-r, yellow.400, orange.400)"
                      color="white"
                      _hover={{ 
                        bgGradient: "linear(to-r, yellow.500, orange.500)",
                        transform: "translateY(-3px)",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
                      }}
                      size="lg"
                      borderRadius="full"
                      px={8}
                      transition="all 0.3s"
                    >
                      Advanced Search
                    </Button>
                  </Link>
                </HStack>
              </MotionBox>
              
              <MotionBox
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                mt={12}
              >
                <Icon 
                  viewBox="0 0 24 24" 
                  color="white" 
                  w={10} 
                  h={10}
                  opacity={0.7}
                  animation="bounce 2s infinite"
                >
                  <path
                    fill="currentColor"
                    d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                  />
                </Icon>
              </MotionBox>
            </VStack>
          </MotionBox>
        </Container>
      </Box>

      {/* Main Content */}
      <Box 
        bg={useColorModeValue('gray.50', 'gray.900')}
        py={20}
        position="relative"
        zIndex="1"
        borderTopRadius="3xl"
        mt="-10vh"
        boxShadow="0 -20px 30px rgba(0,0,0,0.1)"
      >
        <Container maxW="container.xl">
          {/* Browse by Level Section */}
          <VStack spacing={12} mb={20}>
              <Box textAlign="center">
                <Badge 
                  colorScheme="purple" 
                  fontSize="sm" 
                  px={3} 
                  py={1} 
                  borderRadius="full"
                  mb={3}
                >
                  EXPLORE
                </Badge>
                <Heading 
                  as="h2" 
                  size="xl" 
                  bgGradient="linear(to-r, blue.500, purple.500)"
                  bgClip="text"
                  letterSpacing="tight"
                >
                  Browse by Level
                </Heading>
              </Box>
              
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} width="100%">
                <MotionBox
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href="/national" style={{ textDecoration: 'none' }}>
                    <Card 
                      bg={cardBgColor}
                      height="100%"
                      borderRadius="2xl"
                      overflow="hidden"
                      position="relative"
                      boxShadow="xl"
                      _hover={{
                        boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                      }}
                    >
                      <Box 
                        position="absolute"
                        top="0"
                        left="0"
                        right="0"
                        height="40%"
                        bgGradient="linear(to-r, blue.400, blue.600)"
                        borderBottomLeftRadius="30%"
                        borderBottomRightRadius="30%"
                      />
                      <CardBody display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={8} position="relative">
                        <Box 
                          boxSize="120px" 
                          mb={6} 
                          display="flex" 
                          alignItems="center" 
                          justifyContent="center"
                          bg="white"
                          borderRadius="full"
                          p={4}
                          boxShadow="lg"
                        >
                          <Image src="/emblem.svg" alt="National Schemes" boxSize="80px" />
                        </Box>
                        <VStack spacing={3} textAlign="center">
                          <Heading size="lg">National Schemes</Heading>
                          <Text fontSize="md" color="gray.600">Explore schemes implemented by the Central Government of India</Text>
                          <Button 
                            rightIcon={<ChevronRightIcon />} 
                            colorScheme="blue" 
                            variant="solid" 
                            mt={4}
                            borderRadius="full"
                            boxShadow="md"
                            _hover={{
                              transform: 'translateX(5px)',
                              boxShadow: 'lg'
                            }}
                            transition="all 0.3s"
                          >
                            View Categories
                          </Button>
                        </VStack>
                      </CardBody>
                    </Card>
                  </Link>
                </MotionBox>
                
                <MotionBox
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href="/state" style={{ textDecoration: 'none' }}>
                    <Card 
                      bg={cardBgColor}
                      height="100%"
                      borderRadius="2xl"
                      overflow="hidden"
                      position="relative"
                      boxShadow="xl"
                      _hover={{
                        boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                      }}
                    >
                      <Box 
                        position="absolute"
                        top="0"
                        left="0"
                        right="0"
                        height="40%"
                        bgGradient="linear(to-r, green.400, teal.500)"
                        borderBottomLeftRadius="30%"
                        borderBottomRightRadius="30%"
                      />
                      <CardBody display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={8} position="relative">
                        <Box 
                          boxSize="120px" 
                          mb={6} 
                          display="flex" 
                          alignItems="center" 
                          justifyContent="center"
                          bg="white"
                          borderRadius="full"
                          p={4}
                          boxShadow="lg"
                        >
                          <Image src="/chakra.svg" alt="State Schemes" boxSize="80px" />
                        </Box>
                        <VStack spacing={3} textAlign="center">
                          <Heading size="lg">State Schemes</Heading>
                          <Text fontSize="md" color="gray.600">Explore schemes implemented by various State Governments</Text>
                          <Button 
                            rightIcon={<ChevronRightIcon />} 
                            colorScheme="green" 
                            variant="solid" 
                            mt={4}
                            borderRadius="full"
                            boxShadow="md"
                            _hover={{
                              transform: 'translateX(5px)',
                              boxShadow: 'lg'
                            }}
                            transition="all 0.3s"
                          >
                            Select State
                          </Button>
                        </VStack>
                      </CardBody>
                    </Card>
                  </Link>
                </MotionBox>
              </SimpleGrid>
            </VStack>
          

          {/* Featured Schemes Section */}
            <Box mb={20} mt={16}>
              <Flex justifyContent="space-between" alignItems="center" mb={8}>
                <Box>
                  <Badge 
                    colorScheme="blue" 
                    fontSize="sm" 
                    px={3} 
                    py={1} 
                    borderRadius="full"
                    mb={3}
                  >
                    FEATURED
                  </Badge>
                  <Heading 
                    as="h2" 
                    size="lg"
                    bgGradient="linear(to-r, blue.500, purple.500)"
                    bgClip="text"
                  >
                    Popular Schemes
                  </Heading>
                </Box>
                <Button 
                  variant="ghost" 
                  colorScheme="blue" 
                  rightIcon={<ChevronRightIcon />}
                  _hover={{
                    transform: 'translateX(5px)'
                  }}
                  transition="all 0.3s"
                >
                  View All
                </Button>
              </Flex>
              
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                {featuredSchemes.map((scheme, index) => (
                  <MotionCard
                    key={scheme.id}
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    bg={cardBgColor}
                    height="100%"
                    borderRadius="xl"
                    position="relative"
                    overflow="hidden"
                    onClick={() => handleSchemeClick(scheme)}
                    cursor="pointer"
                    boxShadow="lg"
                    _hover={{
                      boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                    }}
                    layoutId={`card-${scheme.id}`}
                  >
                    <Box 
                      position="absolute" 
                      top="0" 
                      left="0" 
                      right="0" 
                      height="8px" 
                      bgGradient={
                        index === 0 ? "linear(to-r, blue.400, blue.600)" :
                        index === 1 ? "linear(to-r, purple.400, purple.600)" :
                        "linear(to-r, orange.400, red.500)"
                      }
                    />
                    
                    {/* Glass effect overlay */}
                    <Box
                      position="absolute"
                      top="8px"
                      left="0"
                      right="0"
                      height="30%"
                      background="linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0))"
                      zIndex="1"
                    />
                    
                    <CardBody p={6} position="relative" zIndex="2">
                      <Flex mb={4} alignItems="center" justifyContent="space-between">
                        <Flex alignItems="center">
                          <MotionBox
                            initial={{ rotate: -10, scale: 0.9 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 + (0.1 * index) }}
                            fontSize="3xl" 
                            mr={4} 
                            bg={
                              index === 0 ? "blue.50" :
                              index === 1 ? "purple.50" :
                              "orange.50"
                            }
                            p={3}
                            borderRadius="full"
                            boxShadow="md"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            className={`icon-${index}`}
                          >
                            {scheme.icon}
                          </MotionBox>
                          
                          <MotionBadge 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 + (0.1 * index) }}
                            colorScheme={
                              index === 0 ? "blue" :
                              index === 1 ? "purple" :
                              "orange"
                            } 
                            alignSelf="start"
                            borderRadius="full"
                            px={3}
                            py={1}
                            fontWeight="medium"
                          >
                            {scheme.category}
                          </MotionBadge>
                        </Flex>
                        
                        <MotionBadge
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.4 + (0.1 * index) }}
                          variant="outline"
                          colorScheme={
                            index === 0 ? "blue" :
                            index === 1 ? "purple" :
                            "orange"
                          }
                          borderRadius="full"
                          px={2}
                          py={1}
                          fontSize="xs"
                        >
                          Featured
                        </MotionBadge>
                      </Flex>
                      
                      <MotionBox
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + (0.1 * index) }}
                      >
                        <Heading size="md" mb={3}>{scheme.name}</Heading>
                        <Text color="gray.600" mb={5}>{scheme.description}</Text>
                      </MotionBox>
                      
                      <Flex justifyContent="space-between" alignItems="center">
                        <MotionBox
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 0.7, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.4 + (0.1 * index) }}
                        >
                          <Text fontSize="xs" color="gray.500">
                            {index === 0 ? "10+ million beneficiaries" : 
                             index === 1 ? "500+ million covered" : 
                             "2+ million homes"}
                          </Text>
                        </MotionBox>
                        
                        <Button 
                          size="sm" 
                          rightIcon={<ChevronRightIcon />} 
                          colorScheme={
                            index === 0 ? "blue" :
                            index === 1 ? "purple" :
                            "orange"
                          }
                          variant="ghost"
                          _hover={{
                            transform: 'translateX(5px)'
                          }}
                          transition="all 0.3s"
                        >
                          Learn more
                        </Button>
                      </Flex>
                    </CardBody>
                  </MotionCard>
                ))}
              </SimpleGrid>
            </Box>

          {/* Quick Links */}
            <Box 
              bg={useColorModeValue('white', 'gray.800')} 
              p={8} 
              borderRadius="2xl" 
              boxShadow="xl"
              border="1px solid"
              borderColor={useColorModeValue('gray.100', 'gray.700')}
              position="relative"
              overflow="hidden"
              mt={16}
            >
              <Box 
                position="absolute"
                top="-20px"
                right="-20px"
                width="150px"
                height="150px"
                borderRadius="full"
                bg="blue.50"
                opacity="0.4"
              />
              
              <Box 
                position="absolute"
                bottom="-30px"
                left="-30px"
                width="180px"
                height="180px"
                borderRadius="full"
                bg="purple.50"
                opacity="0.3"
              />
              
              <Box position="relative" zIndex="1">
                <Heading as="h3" size="md" mb={4} display="flex" alignItems="center">
                  <Box 
                    as="span" 
                    w="30px" 
                    h="4px" 
                    bgGradient="linear(to-r, blue.400, purple.500)" 
                    mr={3} 
                    borderRadius="full"
                  />
                  Quick Links
                </Heading>
                <Divider mb={6} borderColor="gray.200" />
                <SimpleGrid columns={{ base: 2, md: 4 }} spacing={5}>
                  <MotionBox whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Button 
                      variant="ghost" 
                      justifyContent="flex-start" 
                      leftIcon={
                        <Box 
                          bg="yellow.100" 
                          p={2} 
                          borderRadius="full" 
                          display="flex" 
                          alignItems="center" 
                          justifyContent="center"
                        >
                          <Icon as={StarIcon} color="yellow.500" />
                        </Box>
                      }
                      _hover={{ bg: "yellow.50" }}
                      transition="all 0.3s"
                      width="100%"
                      height="60px"
                    >
                      Popular Schemes
                    </Button>
                  </MotionBox>
                  
                  <MotionBox whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link href="/schema-finder" passHref>
                      <Button 
                        variant="ghost" 
                        justifyContent="flex-start" 
                        leftIcon={
                          <Box 
                            bg="blue.100" 
                            p={2} 
                            borderRadius="full" 
                            display="flex" 
                            alignItems="center" 
                            justifyContent="center"
                          >
                            <Icon as={SearchIcon} color="blue.500" />
                          </Box>
                        }
                        _hover={{ bg: "blue.50" }}
                        transition="all 0.3s"
                        width="100%"
                        height="60px"
                      >
                        Schema Finder
                      </Button>
                    </Link>
                  </MotionBox>
                  
                  <MotionBox whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Button 
                      variant="ghost" 
                      justifyContent="flex-start" 
                      leftIcon={
                        <Box 
                          bg="green.100" 
                          p={2} 
                          borderRadius="full" 
                          display="flex" 
                          alignItems="center" 
                          justifyContent="center"
                        >
                          <Icon boxSize={4}>📱</Icon>
                        </Box>
                      }
                      _hover={{ bg: "green.50" }}
                      transition="all 0.3s"
                      width="100%"
                      height="60px"
                    >
                      Mobile Apps
                    </Button>
                  </MotionBox>
                  
                  <MotionBox whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Button 
                      variant="ghost" 
                      justifyContent="flex-start" 
                      leftIcon={
                        <Box 
                          bg="purple.100" 
                          p={2} 
                          borderRadius="full" 
                          display="flex" 
                          alignItems="center" 
                          justifyContent="center"
                        >
                          <Icon boxSize={4}>❓</Icon>
                        </Box>
                      }
                      _hover={{ bg: "purple.50" }}
                      transition="all 0.3s"
                      width="100%"
                      height="60px"
                    >
                      FAQs
                    </Button>
                  </MotionBox>
                </SimpleGrid>
              </Box>
            </Box>
        </Container>
      </Box>
      
      {/* Schema Finder Modal */}
      {isSchemaFinderOpen && (
        <SchemaFinder 
          isOpen={isSchemaFinderOpen} 
          onClose={() => setIsSchemaFinderOpen(false)} 
        />
      )}
      
      {/* Scheme Details Modal */}
      {isSchemeDetailsOpen && selectedScheme && (
        <SchemeDetailsModal
          isOpen={isSchemeDetailsOpen}
          onClose={() => setIsSchemeDetailsOpen(false)}
          schemeId={selectedScheme.id}
          category={selectedScheme.category}
          level={selectedScheme.level}
        />
      )}
      
      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-20px);
          }
          60% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes glow {
          0% {
            box-shadow: 0 0 5px rgba(66, 153, 225, 0.6);
          }
          50% {
            box-shadow: 0 0 20px rgba(66, 153, 225, 0.8);
          }
          100% {
            box-shadow: 0 0 5px rgba(66, 153, 225, 0.6);
          }
        }
        
        .glowing-text {
          animation: textGlow 2s infinite alternate;
        }
        
        @keyframes textGlow {
          from {
            text-shadow: 0 0 10px rgba(255,255,255,0.5), 
                         0 0 20px rgba(255,255,255,0.3), 
                         0 0 30px rgba(66, 153, 225, 0.3);
          }
          to {
            text-shadow: 0 0 15px rgba(255,255,255,0.6), 
                         0 0 25px rgba(255,255,255,0.4), 
                         0 0 35px rgba(66, 153, 225, 0.4);
          }
        }
        
        .icon-0 {
          animation: pulse 3s infinite;
        }
        
        .icon-1 {
          animation: pulse 3.5s infinite;
        }
        
        .icon-2 {
          animation: pulse 4s infinite;
        }
        
        .particles-container {
          background-image: 
            radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px),
            radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: 0 0, 20px 20px;
          animation: particlesMove 20s linear infinite;
        }
        
        @keyframes particlesMove {
          0% {
            background-position: 0 0, 20px 20px;
          }
          100% {
            background-position: 1000px 0, 1020px 20px;
          }
        }
      `}</style>
    </Box>
  );
}