import {
  Divider,
  Stack,
  Text,
  Container,
  Box,
  HStack,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Image,
  Heading,
  SimpleGrid,
  Badge,
  Link,
  Center,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import ProjectsArray from "./ProjectsArray";
import OtherProjectsArray from "./OtherProjectsArray";
import TagsArray from "./TagsArray";

const MotionBox = motion(Box);

export default function Projects({ color }) {
  const projects = ProjectsArray();
  const others = OtherProjectsArray();
  const options = TagsArray("ProjectsTags");

  const [selected, setSelected] = useState("All");

  const handleSelected = (value) => {
    setSelected(value);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Container maxW={"3xl"} id="projects">
      <Stack
        as={Box}
        textAlign={"center"}
        spacing={{ base: 8, md: 14 }}
        pb={{ base: 20, md: 36 }}
      >
        {/* Header */}
        <Stack align="center" direction="row" p={4}>
          <HStack mx={4}>
            <Text color={`${color}.400`} fontWeight={800}>
              03
            </Text>
            <Text fontWeight={800}>Projects</Text>
          </HStack>
          <Divider orientation="horizontal" />
        </Stack>

        {/* Main Projects */}
        <Stack px={4} spacing={6}>
          {projects.map((project) => (
            <MotionBox
              key={project.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card overflow="hidden">
                <Image objectFit="cover" src={project.image} />

                <CardBody align="left">
                  <Heading size="md">{project.name}</Heading>

                  <Text py={2}>{project.description}</Text>

                  <HStack py={2}>
                    {project.buttons.map((button) => (
                      <Button
                        key={button.text}
                        as="a"
                        href={button.href}
                        color={`${color}.400`}
                      >
                        {button.text}
                      </Button>
                    ))}
                  </HStack>

                  <HStack pt={4} spacing={2}>
                    {project.badges.map((badge) => (
                      <Badge
                        key={badge.text}
                        colorScheme={badge.colorScheme}
                      >
                        {badge.text}
                      </Badge>
                    ))}
                  </HStack>
                </CardBody>
              </Card>
            </MotionBox>
          ))}
        </Stack>

        {/* Other Projects */}
        <Text color={"gray.600"} fontSize={"xl"} px={4}>
          Other Projects
        </Text>

        <Center px={4}>
          <ButtonGroup variant="outline">
            <Button
              colorScheme={selected === "All" ? color : "gray"}
              onClick={() => handleSelected("All")}
            >
              All
            </Button>

            {options.map((option) => (
              <Button
                key={option.value}
                colorScheme={selected === option.value ? color : "gray"}
                onClick={() => handleSelected(option.value)}
              >
                {option.value}
              </Button>
            ))}
          </ButtonGroup>
        </Center>

        {/* Other Projects Grid */}
        <SimpleGrid columns={[1, 2, 3]} px={4} spacing={4}>
          {others
            .filter((other) =>
              selected === "All"
                ? true
                : other.tags.includes(selected)
            )
            .map((other) => (
              <MotionBox
                key={other.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card h="100%">
                  <CardBody align="left">
                    <Heading size="sm">{other.name}</Heading>

                    <Text fontSize="sm" py={2}>
                      {other.description}
                    </Text>

                    <HStack spacing={2}>
                      {other.buttons.map((button) => (
                        <Link
                          key={button.text}
                          href={button.href}
                          color={`${color}.400`}
                        >
                          {button.text}
                        </Link>
                      ))}
                    </HStack>

                    <HStack flexWrap="wrap" pt={4} spacing={2}>
                      {other.badges.map((badge) => (
                        <Badge
                          key={badge.text}
                          colorScheme={badge.colorScheme}
                        >
                          {badge.text}
                        </Badge>
                      ))}
                    </HStack>
                  </CardBody>
                </Card>
              </MotionBox>
            ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
