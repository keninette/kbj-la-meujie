import React, {useEffect, useState} from "react";
import Breadcrumb from "../../components/Breadcrumb";
import routes, {getAdventureRoute, getChapterRoute} from "@/app/routes";
import {getAdventureById} from "@/lib/adventures/adventures.lib";
import '../../../public/globals.css';
import Header from "@/components/Header";
import {Metadata} from "next";


export const metadata: Metadata = {
  title: 'kbj la meujie',
}

export default function Adventure() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const adventureId = isClient ? new URL(window.location).searchParams.get('id') : undefined;
  const adventure = adventureId ? getAdventureById(adventureId) : undefined;

  return (
    <main className="flex min-h-screen flex-col text-white">
      <Header></Header>
      <section className="flex flex-col w-full">
        { adventure && (
          <>
            <Breadcrumb previousRoutes={[routes.home]} currentRoute={getAdventureRoute(adventure)}></Breadcrumb>
            <h2 className="flex justify-center w-full text-3xl">{adventure.name}</h2>
            <div className="flex mt-10 mx-6">
              <div className="flex flex-col w-1/3 mx-6">
                <h3 className="text-2xl mb-4">📦 Matériel</h3>
                <ul className="ml-2">
                  {
                    adventure.stuff && adventure.stuff.map((item) => (
                      <>
                        <input type="checkbox" key={item} className="mr-2" />
                        <label>{item}</label>
                      </>
                    ))
                  }
                </ul>
              </div>
              <div className="flex flex-col w-1/3 mx-6">
                <h3 className="text-2xl mb-4">📚 Chapitres</h3>
                <ul className="ml-2">
                  {
                    adventure.chapters.map((chapter) => {
                      return (
                        <li key={chapter.id}>
                          <a href={getChapterRoute(chapter).path} className="text-lg">{chapter.name}</a>
                        </li>
                      );
                    })
                  }
                </ul>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
);
}