import { FetchGear } from "./FetchGear";

export function FetchCompletedList({characterList}) {
    return <>
    <FetchGear data={characterList} />
    </>
}