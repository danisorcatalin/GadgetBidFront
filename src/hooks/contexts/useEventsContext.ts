import { useContext } from 'react';
import { EventsContext } from '../../contexts/EventsContext';

export const useEventsContext = (): EventsContext => useContext(EventsContext);
