import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { useSearchDataQuery } from '../../hooks/useSearchData'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import './SearchDataPage.style.css'
import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons';

const SearchDataPage = () => {
    const [page, setPage] = useState(1)
    const [query, setQuery] = useSearchParams()
    const navigate = useNavigate()
    const keyword = query.get("q");

    const { data, isLoading, isError, error } = useSearchDataQuery({ keyword, page });
    console.log('data?', data)

    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    if (isError) {
        return <h3>Error: {error.message}</h3>;
    }

    return (
        <div>
            <h2>'{keyword}'에 대한 검색 결과 : {data.body.totalCount}건</h2>
            <Grid container spacing={2}>
            {
                data?.body.items.item.map((searchData, index) => (
                    <Grid lg={3} key={index}>
                        <div className='search-data-box'>
                            <h3>{searchData.facltNm}</h3>
                            <img width={300} src={searchData.firstImageUrl =='' ? 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20240128%2Fourlarge%2Fpngtree-big-green-tree-isolated-png-image_11509925.png&type=ff332_332':searchData.firstImageUrl } />
                        </div>
                    </Grid>

                ))
            }
            </Grid>
            <div>현재 페이지 : {page}</div>
            <button onClick={()=>{setPage(page-1)}}>이전</button>
            <button onClick={()=>{setPage(page+1)}}>다음</button>
        </div>
    )
}

export default SearchDataPage