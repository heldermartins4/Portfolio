import React from "react"
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

import {
    parseISO, 
    format
} from "date-fns"

import { ptBR } from 'date-fns/locale';

import { formatDriveUrl } from '@/utils/urlFormat';

import { ArrowSquareOut, GithubLogo } from '@phosphor-icons/react';

interface Modal {
    title: string;
    content: string;
    tags: {name:string}[];
    page: string;
    github: string;
    preview: string;
    img_modal: string;
    video: string;
    created_time: string;
    last_edited_time: string;
}

interface ModalProps {
    posts: Modal;
    children: React.ReactNode;
}

const Modal = ({ posts, children }: ModalProps) => {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                {children}
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-[rgb(0,0,0)] opacity-[25%] data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="overflow-scroll data-[state=open]:animate-contentShow fixed top-0 right-0 h-screen w-full md:w-[40vw] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-4xl m-0 font-bold">
                        {posts.title}
                    </Dialog.Title>
                    <span className='text-slate-600 text-md font-light'>
                        {format(parseISO(posts.last_edited_time), "'Publicado em' dd 'de' MMMM 'de' yyyy 'às' HH:mm", {locale: ptBR})}
                    </span>
                    {/* Tags */}
                    <div className='flex flex-row flex-wrap gap-1 my-3'>
                        {posts.tags && Object.values(posts.tags).map((tag) => (
                        <span key={tag.name} className="border border-slate-600 text-slate-600 rounded-md px-3 py-1 text-sm">
                            {tag.name}
                        </span>
                        ))}
                    </div>
                    {/* Links */}
                    <div className="flex flex-row gap-3">
                        <a 
                            href={posts.page}
                            target="_blank"
                            className='flex gap-2 items-center border border-slate-400 text-slate-600 text-base px-3 py-2 rounded-lg font-semibold'
                        >
                            <ArrowSquareOut size={24} />
                            Ir para a página
                        </a>
                        <a 
                            href={posts.github}
                            target="_blank"
                            className='flex gap-2 items-center bg-black text-base px-3 py-2 rounded-lg text-white font-semibold'
                        >
                            <GithubLogo size={24}/>
                            Github
                        </a>
                    </div>
                    <Dialog.Description className="bg-slate-300 text-slate-600 my-3 rounded-lg p-4">
                        {posts.content}
                    </Dialog.Description>
                    <div className="w-full p-3 flex flex-col gap-3">
                        <img 
                            src={formatDriveUrl(posts.img_modal)}
                            className='w-full bg-slate-300 border border-slate-400 rounded-lg'
                        />
                        <img
                            className='w-full rounded-lg shadow-lg'
                            src={posts.video}
                        />
                    </div>
                    <Dialog.Close asChild>
                    <button
                        className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                        aria-label="Close"
                    >
                        <Cross2Icon />
                    </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default Modal;