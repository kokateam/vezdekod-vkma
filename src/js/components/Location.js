import React from "react";
import { Avatar, Headline, HorizontalCell } from "@vkontakte/vkui";

function Location({ dataLocation }) {
    return (
        <HorizontalCell size="l" disabled>
            <Avatar
                size={128}
                mode="image"
                src={dataLocation.photo}
                className={'location'}
            >
                <Headline weight="semibold" className={'location-header'}>
                    {dataLocation.name}
                </Headline>
            </Avatar>
        </HorizontalCell>
    )
}

export default Location;