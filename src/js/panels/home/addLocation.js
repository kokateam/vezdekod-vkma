import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "@reyzitwo/react-router-vkminiapps";

import {
    PanelHeader,
    PanelHeaderBack,
    Group,
    Input,
    FormLayout,
    FormItem,
    File,
    Button
} from "@vkontakte/vkui";
import { ChipsSelect } from "@vkontakte/vkui/dist/unstable";
import { Icon24PictureOutline, Icon28ArrowDownOutline, Icon24ArrowRightOutline } from '@vkontakte/icons';
import { set } from "../../reducers/locationsReducer";

function HomePanelAddLocation({ router }) {
    const isDesktop = useSelector((state => state.main.isDesktop))
    const locationsStorage = useSelector((state) => state.locations);

    const editJobs = []
    if (locationsStorage.editData.length !== 0) {
        locationsStorage.editData.job.forEach((el, index) => editJobs.push({ value: index, label: el }))
    }

    const [locationData, setData] = useState({
        id: locationsStorage.editData.length === 0 ? 0 : locationsStorage.editData.id,
        name: locationsStorage.editData.length === 0 ? "" : locationsStorage.editData.name,
        photo: locationsStorage.editData.length === 0 ? "" : locationsStorage.editData.photo,
        job: locationsStorage.editData.length === 0 ? [] : editJobs
    })
    const dispatch = useDispatch()

    function uploadPhoto(photo) {
        let reader = new FileReader()
        reader.readAsDataURL(photo)

        reader.onload = () => {
            setData({ ...locationData, photo: reader.result })
        }
    }

    function addLocation() {
        let arrJob = [...locationData.job]
        for (let i = 0; i < arrJob.length; i++) {
            arrJob[i] = arrJob[i].label
        }

        let arrLocations = [...locationsStorage.locations]
        arrLocations.unshift({
            id: 0,
            name: locationData.name,
            photo: locationData.photo,
            job: arrJob
        })
        for (let i = 0; i < arrLocations.length; i++) {
            let obj = {...arrLocations[i]}
            obj.id = i

            arrLocations[i] = obj
        }

        dispatch(set({ key: 'locations', value: arrLocations }))
        router.toBack()
    }

    function editLocation() {
        let arrJob = [...locationData.job]
        for (let i = 0; i < arrJob.length; i++) {
            arrJob[i] = arrJob[i].label
        }

        let arrLocations = [...locationsStorage.locations]
        arrLocations[locationData.id] = {
            id: locationData.id,
            name: locationData.name,
            photo: locationData.photo,
            job: arrJob
        }

        dispatch(set({ key: 'locations', value: arrLocations }))
        router.toBack()
    }

    return(
        <>
            <PanelHeader
                separator={isDesktop}
                left={<PanelHeaderBack onClick={() => router.toBack()}/>}
            >
                {locationsStorage.editData.length === 0 ? 'Создание' : "Редактирование"}
            </PanelHeader>

            <Group>
                <FormLayout>
                    <FormItem top={'Название'}>
                        <Input
                            placeholder={'Введите название...'}
                            value={locationData.name}
                            onChange={(e) =>
                                setData({ ...locationData, name: e.currentTarget.value })
                            }
                        />
                    </FormItem>

                    <FormItem top="Персонажи на локации">
                        <ChipsSelect
                            value={locationData.job}
                            onChange={(value) =>
                                setData({ ...locationData, job: value })
                            }
                            options={[]}
                            placeholder="Не выбраны"
                            creatable={true}
                        />
                    </FormItem>

                    <FormItem top="Фотография локации">
                        <File
                            name="photo"
                            before={
                                locationData.photo === "" ? (
                                    <Icon24PictureOutline width={28} />
                                ) : (
                                    <Icon28ArrowDownOutline />
                                )
                            }
                            accept="image/x-png,image/png,image/webp,image/svg"
                            required
                            stretched
                            controlSize="l"
                            mode={locationData.photo === "" ? "secondary" : "primary"}
                            onChange={(e) => {
                                e.preventDefault();
                                uploadPhoto(e.target.files[0]);
                            }}
                            style={{ marginBottom: 10 }}
                        >
                            {locationData.photo === "" ? "Выберите фото" : ""}
                        </File>
                    </FormItem>

                    <FormItem top="Персонажи на локации">
                        <Button
                            after={<Icon24ArrowRightOutline />}
                            size="l"
                            appearance="positive"
                            stretched
                            onClick={() => {
                                if (locationsStorage.editData.length === 0) return addLocation()
                                editLocation()
                            }}
                            disabled={Object.values(locationData).some(
                                (element) => element.length === 0
                            )}
                        >
                            {locationsStorage.editData.length === 0 ? 'Создать' : "Отредактировать"}
                        </Button>
                    </FormItem>
                </FormLayout>
            </Group>
        </>
    )
}

export default withRouter(HomePanelAddLocation);