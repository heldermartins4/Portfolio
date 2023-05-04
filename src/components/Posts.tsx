import React from 'react';
import * as HoverCard from '@radix-ui/react-hover-card';

import {
  parseISO, 
  format
} from "date-fns"
import { ptBR } from 'date-fns/locale';

interface Posts {
    title: string;
    content: string;
    tags: {name:string}[];
    url: string;
    img: string;
    created_time: string;
    last_edited_time: string;
}

interface PostsProps {
    posts: Posts;
    grid: string;
}

export const Posts = ({ posts, grid }:PostsProps) => (
  <HoverCard.Root>
    <HoverCard.Trigger asChild>
      <a
        className={`
          w-full 
          h-[300px]
          bg-slate-400 
          relative overflow-hidden
          ${grid}
        `}
        href={posts.url}
        target="_blank"
        rel="noreferrer noopener"
      >
        <div 
          className="
            absolute 
            w-full
            h-full
            top-0 
            left-0 
            bg-no-repeat 
            bg-center 
            bg-cover
            hover:scale-125
            transition-all 
            duration-200 
            ease-in" 
          style={{
            backgroundImage: 'url("https://1.bp.blogspot.com/-ekd0JSmGzGk/YVuy2ry1WOI/AAAAAAAAAgI/vSdfuKsjjfotz3jUpAHLUx3MIZ5RhzCFACLcBGAsYHQ/s1764/Scooby%2BDoo%2Bfilme.png")'
          }} 
        />
      </a>
    </HoverCard.Trigger>
    <HoverCard.Portal>
      <HoverCard.Content
        className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[300px] rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
        sideOffset={5}
      >
        <div className="flex flex-col gap-[7px]">
          <iframe
            className='w-full rounded-lg'
            src="https://www.youtube.com/embed/zoFHtDo8jEQ" 
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
            allowFullScreen
          />
          <div className="flex flex-col gap-[15px]">
            <div>
              <div className="text-mauve12 m-0 text-2xl font-bold">{posts.title}</div>
              <div className='text-xs text-slate-700 font-normal tracking-wide mb-3'>{
                format(parseISO(posts.last_edited_time), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {locale: ptBR})
              }</div>
              <div className='flex flex-row flex-wrap gap-1'>
                {posts.tags && Object.values(posts.tags).map((tag) => (
                  <span key={tag.name} className="border border-slate-700 text-slate-600 rounded-md px-3 py-1 text-xs">
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-mauve12 m-0 text-base leading-[1.5]">
              {posts.content}
            </div>
          </div>
        </div>

        <HoverCard.Arrow className="fill-white" />
      </HoverCard.Content>
    </HoverCard.Portal>
  </HoverCard.Root>
);