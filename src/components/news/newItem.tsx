import React from "react";
interface NewsItemProps {
  title: string;
  description: string;
  src: string;
  url: string;
}

const NewsItem: React.FC<NewsItemProps> = ({
  title,
  description,
  src,
  url,
}) => {
  return (
    <div className="max-w-sm bg-white inline-block border border-gray-200 rounded-lg shadow mb-3 my-3 mx-3 min-h-[20rem]">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img
          className="rounded-t-lg h-[200px] w-[384px]"
          src={src ? src : "/news.jpg"}
          alt="News image"
        />
      </a>
      <div className="p-5 overflow-hidden">
        <a href={url} target="_blank" rel="noopener noreferrer">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 min-h-[10rem] ">
            {title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 h-[6rem] line-clamp-5 ">
          {description
            ? description
            : "News is a report of a current event. It is information about something that has just happended."}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};
export default NewsItem;
