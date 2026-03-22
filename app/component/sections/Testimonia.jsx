import React from 'react';
import { sanity } from '@/lib/sanity';
import { allTestimoniaQuery } from '@/lib/queries';
import TestimoniaClient from './TestimoniaClient.jsx';

export const revalidate = 3600;

export default async function Testimonia() {
  try {
    const data = await sanity.fetch(allTestimoniaQuery, {}, { next: { revalidate: 60 } });
    const enrichedData = (data || []).map(item => ({
      ...item,
      company: item.company || 'BookOne Client',
      projectType: item.projectType || 'Website Design & Development'
    }));

    return <TestimoniaClient testimonia={enrichedData} />;
  } catch (err) {
    console.error('Testimonia server fetch error', err);
    return <TestimoniaClient testimonia={[]} />;
  }
}
