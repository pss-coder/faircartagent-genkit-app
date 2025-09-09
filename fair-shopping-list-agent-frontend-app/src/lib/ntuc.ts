import { get } from "http";


export async function searchNTUC(item: string){
    // 20 at a time
    const url = `https://website-api.omni.fairprice.com.sg/api/product/v2?page=1&url=${encodeURIComponent(item)}`;

    const searchResults: any[] = [];

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        const { data } = json;

        // const paginationData = data.pagination;
        // const { page, page_size, total_pages } = paginationData
        // console.log(`Page: ${page}, Page Size: ${page_size}, Total Pages: ${total_pages} \n`);

        const products = data.product || [];
        // searchResults.push(...products);
        // // for each product
        products.forEach((product: any) => {
            const {id, final_price, name, images } = product
            searchResults.push(
                {
                    id,
                    name,
                    price: final_price,
                }
            )
        });

        // return searchResults;
    }
    catch (error) {
        console.error(error);
    }

    console.log(`Found ${searchResults.length} products for "${item}"`);

    return searchResults.slice(0, 5); // return top 5 only
}


// Alternative version with more control and error handling
export async function getNTUCProductsAdvanced(item: string, options: {
    maxPages?: number;
    startPage?: number; // which page to start from
    delay?: number; // milliseconds between requests
    onPageFetched?: (page: number, totalPages: number, products: any[]) => void;
} = {}) {
    const { maxPages, startPage = 1, delay = 0, onPageFetched } = options;
    const allProducts: any[] = [];
    let currentPage = startPage || 1;
    let totalPages = 1;

    do {
        const url = `https://website-api.omni.fairprice.com.sg/api/product/v2?page=${currentPage}&url=${encodeURIComponent(item)}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const json = await response.json();
            const { data } = json;

            const paginationData = data.pagination;
            const { page, page_size, total_pages } = paginationData;
            
            totalPages = total_pages;
            const products = data.product || [];
            
            allProducts.push(...products);
            
            // Call callback if provided
            if (onPageFetched) {
                onPageFetched(page, total_pages, products);
            }
            
            console.log(`Fetched page ${page}/${total_pages} - ${products.length} products`);
            
            currentPage++;
            
            // Add delay between requests if specified
            if (delay > 0 && currentPage <= totalPages) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
            
        } catch (error) {
            console.error(`Error fetching page ${currentPage}:`, error);
            break;
        }
        
        // Stop if we've reached the maximum pages limit (but not if maxPages is -1)
        if (maxPages && maxPages !== -1 && (currentPage - startPage + 1) > maxPages) {
            console.log(`Stopped after fetching ${maxPages} pages (from page ${startPage} to ${currentPage - 1})`);
            break;
        }
        
    } while (currentPage <= totalPages);
    
    return {
        products: allProducts,
        totalFetched: allProducts.length,
        pagesFetched: currentPage - startPage,
        totalPages,
        startPage,
        endPage: currentPage - 1
    };
}