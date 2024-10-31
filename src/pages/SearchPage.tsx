import { useSearchRestaurants } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
    searchQuery: string;
    page: number;
    selectedCuisines: string[];
    sortOption: string;
};


export default function SearchPage() {

    const { city } = useParams();

    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: '',
        page: 1,
        selectedCuisines: [],
        sortOption: 'bestMatch',
    });

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const setSelectedCuisines = (selectedCuisines: string[]) => {
        setSearchState((prevState) => ({
            ...prevState,
            selectedCuisines,
            page: 1, // Reset the page to 1 when a new cuisine selection is made.
        }));
    }
    // Use the city parameter to fetch and display search results.
    // For example, fetch data from an API or use a search algorithm to find relevant results.
    // Display the search results in a list or grid.
    // Implement pagination if needed.
    // Use the useParams hook to extract the city parameter from the URL.
    // Example: /search/nairobi

    const {results, isLoading} = useSearchRestaurants(searchState, city);

    const setSortOption = (sortOption: string) => {
        setSearchState((prevState) => ({
            ...prevState,
            sortOption,
        }));
    }
    
    // Implement the logic to handle pagination.
    const setPage = (page: number) => {
        setSearchState((prevState) => ({
            ...prevState,
            page,
        }));
    }; 
    // Handle form submission and update the search query state.

    /* This code updates the `searchState` by merging the current state
     (`prevState`) with a new `searchQuery` value from the submitted form data (`searchFormData`). */
    
    const setSearchQuery = (searchFormData: SearchForm) => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: searchFormData.searchQuery,
            page: 1, // Reset the page to 1 when a new search query is submitted.
        }));
    };

    const resetSearch = () => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: "",
        }));
    }

    if(isLoading) {
        return <span>Loading...</span>;
    }

    if(!results?.data || !city) {
        return <span>No Results found</span>;
    }

    

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
        <div id="cuisines-list">
            <CuisineFilter selectedCuisines = {searchState.selectedCuisines} 
            onChange={setSelectedCuisines}
            isExpanded={isExpanded} onExpandedClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}/>
        </div>
        <div id="main-content" className="flex flex-col gap-5">
            <SearchBar searchQuery={searchState.searchQuery} onSubmit={setSearchQuery} placeholder="Search by Cuisine or Restaurant name" onReset={resetSearch}/>
            
            <div className="flex justify-between flex-col lg:flex-row gap-3">
                <SearchResultInfo total={results.pagination.total} city={city} />
                <SortOptionDropdown sortOption={searchState.sortOption} onChange={(value) => setSortOption(value)} />
            </div>
            
            
            {results.data.map((restaurant) => (
                <SearchResultCard restaurant={restaurant}  />
            ))}
            <PaginationSelector
             page={results.pagination.page}
             pages={results.pagination.pages} 
             onPageChange={setPage} />
        </div>
    </div>
  );
}