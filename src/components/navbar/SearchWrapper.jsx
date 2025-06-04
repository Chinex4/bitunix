import { useState } from "react";
import SearchBar from "./SearchBar";
import SearchModal from "./SearchModal";

const SearchWrapper = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className='flex items-center gap-4'>
      <SearchBar openModal={() => setIsSearchOpen(true)} />
      <SearchModal
        isOpen={isSearchOpen}
        closeModal={() => setIsSearchOpen(false)}
      />
    </div>
  );
};

export default SearchWrapper;
