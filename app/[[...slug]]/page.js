import {notFound} from 'next/navigation';
import LegacyDocument from '@/components/LegacyDocument';
import {loadLegacyPage} from '@/lib/legacy-page';
export async function generateMetadata({params}){const {slug=[]}=await params;const p=await loadLegacyPage(slug);if(!p)return{};return{title:{absolute:p.title},description:p.description||undefined,alternates:p.canonical?{canonical:p.canonical}:undefined}}
export default async function Page({params}){const {slug=[]}=await params;const p=await loadLegacyPage(slug);if(!p)notFound();return <>{p.stylesheets.map((s,i)=><link key={`${s.href}-${i}`} rel="stylesheet" href={s.href} media={s.media}/>)}{p.inlineStyles.map((css,i)=><style key={i} dangerouslySetInnerHTML={{__html:css}}/>)}<LegacyDocument page={p}/></>}
