import { Fragment } from "react";


import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import {getAllEvents, getEventById, getFeaturedEvents} from '../helpers/api-util';
import ErrorAlert from "@/components/ui/error-alert/error-alert";

function EventDetailPage({selectedEvent}) {
  const {date, location, image, title , description} = selectedEvent;

  if (!selectedEvent) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <Fragment>
      <EventSummary title={title} />
      <EventLogistics
        date={date}
        address={location}
        image={image}
        imageAlt={title}
      />
      <EventContent>
        <p>{description}</p>
      </EventContent>
    </Fragment>
  );
}


export async function getStaticProps(context) {
  const eventId = context.params.eventId;
const event = await getEventById(eventId)

return {
  props: {
    selectedEvent: event
  },
  revalidate: 30
 };
}



export async function getStaticPaths (){
  const events = await getAllEvents();
  const paths = events.map(event => ({params: { eventId: event.id}}));
  return {
    paths: paths,
    fallback: 'blocking'
  }
}

export default EventDetailPage;