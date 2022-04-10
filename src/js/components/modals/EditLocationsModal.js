import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from '@reyzitwo/react-router-vkminiapps';
import {
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    IOS,
    SimpleCell
} from "@vkontakte/vkui";
import {
    Icon24Dismiss,
    Icon24Cancel,
    Icon28EditOutline,
    Icon28DeleteOutline
} from '@vkontakte/icons'
import { set } from "../../reducers/locationsReducer";

function EditLocationsModal({ nav, router }) {
    const locationsStorage = useSelector((state) => state.locations)
    const mainStorage = useSelector((state) => state.main)
    const dispatch = useDispatch()

    function deleteLocation() {
        let arr = [...locationsStorage.locations]
        arr.splice(locationsStorage.editData.id, 1)
        for (let i = 0; i < arr.length; i++) {
            let obj = {...arr[i]}
            obj.id = i

            arr[i] = obj
        }

        dispatch(set({ key: 'locations', value: arr }))
        router.toBack()
    }

    return (
        <ModalPage
            nav={nav}
            header={
                <ModalPageHeader
                    left={!mainStorage.isDesktop && (mainStorage.platform !== IOS &&
                        <PanelHeaderButton onClick={() => router.toBack()}>
                            <Icon24Cancel/>
                        </PanelHeaderButton>
                    )}

                    right={!mainStorage.isDesktop && (mainStorage.platform === IOS &&
                        <PanelHeaderButton onClick={() => router.toBack()}>
                            <Icon24Dismiss/>
                        </PanelHeaderButton>
                    )}
                >
                    Редактирование
                </ModalPageHeader>
            }
            onClose={() => router.toBack()}
            settlingHeight={100}
        >
            <SimpleCell
                before={<Icon28EditOutline />}
                description="Быстрая замена названия, либо фотографии локации!"
                onClick={() => {
                    router.toBack()
                    router.toPanel('addLocation')
                }}
            >
                Отредактировать
            </SimpleCell>

            <SimpleCell
                before={<Icon28DeleteOutline fill="var(--destructive)" />}
                description="Действие будет невозможно отменить."
                onClick={() => deleteLocation()}
            >
                Удалить
            </SimpleCell>
        </ModalPage>
    );
}

export default withRouter(EditLocationsModal);