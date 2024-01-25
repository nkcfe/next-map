import { CiSearch } from "react-icons/ci";
import { DISTRICT_ARR } from "@/data/store";

interface SearchFilterProps {
  setQ: React.Dispatch<React.SetStateAction<string | null>>;
  setDistrict: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function SearchFilter({ setQ, setDistrict }: SearchFilterProps) {
  return (
    <div className="flex flex-col md:flex-row gap-2 my-4">
      <div className="flex items-center justify-center w-full gap-2">
        <CiSearch className="w-6 h-6" />
        <input
          type="search"
          onChange={(e) => setQ(e.target.value)}
          placeholder="음식점 검색"
          className="block w-full p-3 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500 outline-none"
        />
        <select
          onChange={(e) => setDistrict(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-800 text-sm md:max-w-[200px] rounded-lg focus:border-blue-500 block w-full p-3"
        >
          <option value="">지역 선택</option>
          {DISTRICT_ARR.map((district, index) => (
            <option value={district} key={index}>
              {district}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
