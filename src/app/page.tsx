"use client";

import WeatherWidget from "../components/weatheWidget";
import Intro from "../components/intro";
import { useActiveSectionContext } from "../context/active-section-context";
import NewsBoard from "../components/news/newsBoard";
import TaskWrapper from "../components/taskManager/taskWrapper";

export default function Home() {
  const { activeSection, category } = useActiveSectionContext();
  return (
    <main className="flex flex-col items-center">
      {activeSection === "Home" && <Intro />}
      {activeSection === "Weather" && <WeatherWidget />}
      {activeSection === "News" && <NewsBoard category={category} />}
      {activeSection === "Tasks" && <TaskWrapper />}
    </main>
  );
}
