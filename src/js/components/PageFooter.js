import React from "react";
import { Fragment } from "react";
import { Footer, Placeholder } from "@vkontakte/vkui";

const PageFooter = ({
    length,
    dataLength,
    locales,
    findIsEmpty = "",
    findText = "",
    findNotEmpty = "",
    searchLocales = [],
}) => {
    locales.forEach((el, i) => {
        locales[i] = el.replace("%V%", dataLength);
    });

    searchLocales.forEach((el, i) => {
        searchLocales[i] = el.replace("%V%", dataLength);
    });

    function declOfNum(number, words) {
        return words[
            number % 100 > 4 && number % 100 < 20
                ? 2
                : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
            ];
    }

    const isLength = length !== 0;
    const isDataLength = dataLength !== 0;

    return (
        <Fragment>
            {isLength && isDataLength && (
                <Footer>
                    {findText.replace("%V%", declOfNum(dataLength, locales))}
                </Footer>
            )}

            {isLength && !isDataLength && <Placeholder>{findIsEmpty}</Placeholder>}

            {!isLength && isDataLength && (
                <Footer>
                    {findNotEmpty.replace("%V%", declOfNum(dataLength, searchLocales))}
                </Footer>
            )}

            {!isLength && !isDataLength && (
                <Placeholder>Ничего не найдено!</Placeholder>
            )}
        </Fragment>
    );
};

export default PageFooter;