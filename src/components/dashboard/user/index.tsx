import { useRouter } from "next/router";
import { api } from "../../../utils/api";
import { useEffect, useState } from "react";
import CategoryItem from "./category";
import Popup from "./Popup";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Title } from "@mantine/core";
import { Leaderboard } from "~/components/Leaderboard";

const HomePage = () => {
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState(0);

  const [opened, { open, close }] = useDisclosure(false);

  const [popupData, setPopupData] = useState({ cat: 0, pos: 0 });

  const { error, data } = api.home.loadData.useQuery();

  const categoryInfo = api.home.categoryInfo.useMutation();

  useEffect(() => {
    categoryInfo.mutateAsync(activeCategory);
  }, [activeCategory]);

  return (
    <div>
      <div className="grid grid-cols-8 gap-4 h-screen">
        <div className="flex flex-col gap-4 col-span-2 overflow-y-scroll no-scrollbar">
          {data?.categories.map((category, index) => (
            <CategoryItem
              description={category.description}
              id={category.id}
              image={category.image}
              name={category.name}
              onClick={() => {
                setActiveCategory(category.id);
              }}
            />
          ))}
        </div>

        <div className="col-span-4 ">
          <Title className="text-2xl">Kategorie {categoryInfo.data?.name}</Title>
          <div className="text-xl line-clamp-3">{categoryInfo.data?.description}</div>

          {categoryInfo.data?.exercises.map((exercise) => (
            // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
            <div
              key={exercise.id}
              className="flex flex-col gap-4"
              onClick={() => {
                open();
                setPopupData({ cat: activeCategory, pos: exercise.categoryPosition });
              }}
            >
              <div className="flex flex-row justify-between">
                <div className="text-2xl">{exercise.categoryPosition}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-2">
          <Leaderboard />
        </div>
      </div>
      <Modal size={"xl"} opened={opened} onClose={close} centered>
        <Popup cat={popupData.cat} pos={popupData.pos} />
      </Modal>
    </div>
  );
};

export default HomePage;
