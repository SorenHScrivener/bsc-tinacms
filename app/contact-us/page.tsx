import PageComponent from "@/components/main";
import { PageAndNavAndDataQuery } from '@/tina/__generated__/types'
import { client } from "@/tina/__generated__/client"
import { tinaField } from 'tinacms/dist/react'
import { useTina } from 'tinacms/dist/react';

export default async function page(props: PageAndNavAndDataQuery['data']) {
    const result = await client.queries.pageAndNavAndData({ relativePath: "contact-us.md" });
    // const { data } = useTina(props);
    const data = result.data.data; 
    const email = data.email;
    const phone = data.phone;
    const address = data.address;
    const map = data.mapLink;
    // console.log(data)
    //  data-tina-field={tinaField()}
    return (
        <>
            <PageComponent  {...result} />
        </>
    )
}