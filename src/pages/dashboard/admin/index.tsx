import { Group, Tabs, Title, Text, createStyles, Divider } from "@mantine/core";
import { useState } from "react";
import { FaLink, FaMailBulk, FaPersonBooth } from "react-icons/fa";
import WorkersPage from "./pages/workers";
import LinksPage from "./pages/links";
import MailingPage from "./pages/mailing";

const useStyles = createStyles((theme) => ({
    body: {
        padding: 10
    }
}));

const AdminPage = () => {
  const [page, setPage] = useState<string | null>("Workers");
  const { classes } = useStyles();

  const getDescription = (value: string): string => {
    switch(value) {
        case "Workers": return "Manage your workers in this simple list";
        case "Links": return "Manage your incoming and outcoming invites";
        case "Mailing": return "Manage your mailing sessions for your workers";
    }

    return "";
  };

  const getTitle = (value: string): string => {
    switch(value) {
        case "Workers": return "Zamestnanci";
        case "Links": return "Pozvanky";
        case "Mailing": return "Maily";
    }

    return "";
  }

  return (
    <div className={classes.body}>
      <Group display="block">
        <Title>{getTitle(page || "")}</Title>
        <Text>{getDescription(page || "")}</Text>
      </Group>

      <Tabs mt={10} variant="pills" onTabChange={setPage} value={page} defaultValue="gallery">
        <Tabs.List> 
          <Tabs.Tab value={"Workers"} icon={<FaPersonBooth size="0.8rem" />}>Zamestnanci</Tabs.Tab>
          <Tabs.Tab value={"Links"} icon={<FaLink size="0.8rem" />}>Pozvanky</Tabs.Tab>
          <Tabs.Tab value={"Mailing"} icon={<FaMailBulk size="0.8rem" />}>Maily</Tabs.Tab>
        </Tabs.List>

        <Divider mt={15} mb={10}/>

        <Tabs.Panel value="Workers" pt="xs"><WorkersPage/></Tabs.Panel>
        <Tabs.Panel value="Links" pt="xs"><LinksPage/></Tabs.Panel>
        <Tabs.Panel value="Mailing" pt="xs"><MailingPage/></Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default AdminPage;