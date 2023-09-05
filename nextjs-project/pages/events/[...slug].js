import { getFilteredEvents } from "@/dummy-data";
import { useRouter } from "next/router"
import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import { Fragment } from "react";



export default function FilteredEventsPage () {

    const router = useRouter();
    const filterData  = router.query.slug;

    if(!filterData){
        return <p className="center">Loading...</p>
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear
    const numMonth = +filteredMonth

    if (isNaN(numYear) || isNaN(numMonth) || numYear >2030 || numYear<2021 || numMonth < 1 || numMonth >12  ){
        return <p>Invalid filter. Please adjust your values</p>
    }

    const filteredEvents = getFilteredEvents({
        year: numYear,
        month: numMonth,
    })
    
    if(!filteredEvents || filteredEvents.length === 0){
      return ( <p>
        No events found for the chosen filter!
        </p>) 

    }


    const date = new Date(numYear, numMonth -1)
    
    return (
        <Fragment >
             <ResultsTitle  date={date} />
                 <EventList items={filteredEvents} />
        </Fragment>
           
    )
}
