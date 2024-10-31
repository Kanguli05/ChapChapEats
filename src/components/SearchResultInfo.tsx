import { Link } from "react-router-dom";

type Props = {
    total: number;
    city: string;
}

const SearchResulInfo = ({ total, city }: Props) => {
    return (
        <div className="ml-1 text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
            <span>
                {total} Restaurants found in {city}
                <Link to="/" className="text-sm font-semibold underline cursor-pointer text-blue-500">Change Location</Link>
            </span>
        </div>
    )
}

export default SearchResulInfo;
