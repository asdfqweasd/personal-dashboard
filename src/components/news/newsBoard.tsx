import React, { useEffect, useState } from "react";
import NewsItem from "./newItem";

interface Article {
  title: string;
  description: string;
  urlToImage: string;
  url: string;
}
interface NewsBoardProps {
  category: string;
}
const NewsBoard: React.FC<NewsBoardProps> = ({ category }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch(`/api/news?category=${category}`);
      const data = await response.json();
      // filter removed article
      console.log(data.articles);
      const filteredArticles = data.articles.filter(
        (article: { title: string }) => article.title !== "[Removed]"
      );
      console.log(filteredArticles);

      setArticles(filteredArticles);
    };

    fetchNews();
  }, [category]);

  return (
    <div>
      <h2 className=" text-center text-4xl ">
        Latest{" "}
        <span className="bg-red-900 text-4xl text-white font-medium me-2 px-2.5 py-0.5 rounded  border-red-400">
          News
        </span>
      </h2>
      <div className="flex flex-wrap justify-center">
        {articles.map((news) => {
          return (
            <NewsItem
              key={news.url}
              title={news.title}
              description={news.description}
              src={news.urlToImage}
              url={news.url}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewsBoard;
