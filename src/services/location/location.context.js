import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { locationRequest, locationTransform } from './location.service';

export const LocationContext = React.createContext();

export const LocationContextProvider = ({ children }) => {
    const [keyword, setKeyword] = useState('San Francisco');
    const [location, setLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSearch = (searchKeyword) => {
        setIsLoading(true);
        setKeyword(searchKeyword);
        if (!searchKeyword.length) {
            // don't do anything
            return;
        }
        locationRequest(searchKeyword.trim().toLowerCase())
            .then(locationTransform)
            .then((result) => {
                setIsLoading(false);
                setLocation(result);
                console.log(result);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
                console.log(err);
            });
    };

    return (
        <LocationContext.Provider
            value={{
                isLoading,
                error,
                location,
                search: onSearch,
                keyword,
            }}
        >
            {children}
        </LocationContext.Provider>
    );
};

LocationContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
