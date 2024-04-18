import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { useSearchDataQuery } from '../../hooks/useSearchData'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import './SearchDataPage.style.css'
import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons';
import ListCard from '../CampingListPage/components/ListCard/ListCard';
import { Container } from 'react-bootstrap';

const SearchDataPage = () => {
    const [page, setPage] = useState(1)
    const [query, setQuery] = useSearchParams()
    const navigate = useNavigate()
    const keyword = query.get("q") || ""
    const province = query.get("province")
    const city = query.get("city")



    const { data, isLoading, isError, error } = useSearchDataQuery({ keyword, page })
    console.log('data?', data)

    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    if (isError) {
        return <h3>Error: {error.message}</h3>;
    }


    const filteredData = data?.items.item.filter(item => {
        return (!province || item.doNm === province) && (!city || item.SigunguNm === city);
    })

    // let lengthOfFilteredData = filteredData?.length;

    const facilityData = data?.items.item.map((item,index)=>(
        item.sbrsCl.split(',')
    ))
    

    
    

    return (
        <Container maxWidth="lg">
            <div>
                <h2>'{keyword}'에 대한 검색 결과 : {data?.totalCount}건</h2>
                <div>현재 페이지 : {page}</div>
                <button onClick={() => { setPage(page - 1) }}>이전</button>
                <button onClick={() => { setPage(page + 1) }}>다음</button>
                <Grid container spacing={2}>
                    {
                        filteredData.map((searchData, index) => (

                            
                                <Grid key={index}>
                                    <ListCard data={searchData} facilityData={facilityData} index={index} />
                                </Grid>
                            
                        ))
                    }
                </Grid>

            </div>
        </Container>
    )
}

export default SearchDataPage