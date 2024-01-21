export const sortData = (data, sortby) => {
    return [...data].sort((a, b) => (
        sortby === "asc" ?
            ((a.price > b.price) ? 1 : -1)
            :
            ((a.price < b.price) ? 1 : -1)
    ))
}

export const filterData = (data, category) => {
    return [...data].filter(item => item?.category === category);
}

