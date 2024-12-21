import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import GroupItem from "../../components/Form/GroupItem";
import MyCard from "../../components/UI/MyCard";
import { pathNames } from "../../constants";
import { LocationForm } from "../../dataForm/locationForm";
import { useToast } from "../../hooks/useToast";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { useLocationStore } from "../../stores/locationStore";

const schema = yup
    .object()
    .shape({
        name: yup.string().required("Tên vị trí là bắt buộc."),
        latitude: yup.string().required("Vĩ độ là bắt buộc."),
        longitude: yup.string().required("Kinh độ là bắt buộc."),
        accuracy: yup.number().required("Độ chính xác (mét) là bắt buộc."),
    })
    .required();

const CreateLocation = () => {
    const {
        handleSubmit,
        formState: { errors },
        control,
        watch,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            latitude: "",
            longitude: "",
            accuracy: 50,
        },
    });

    const navigate = useNavigate();

    const setFooterActions = useCommonStore((state) => state.setFooterActions);
    const setHeaderTitle = useCommonStore((state) => state.setHeaderTitle);
    const resetActions = useCommonStore((state) => state.resetActions);
    const { showToast } = useToast();
    const { addLocation } = useLocationStore();
    const onSubmit = async (values: any) => {
        const transferData = {
            ...values,
            latitude: +values.latitude,
            longitude: +values.longitude,
        };
        const result = await addLocation(transferData);
        if (!result) {
            showToast({
                severity: "danger",
                summary: "Thông báo",
                message: "Tạo thất bại",
                life: 3000,
            });
            return;
        }
        showToast({
            severity: "success",
            summary: "Thông báo",
            message: "Tạo thành công",
            life: 3000,
        });
        navigate(pathNames.LOCATION);
    };

    const handleGetLocation = (hiddenToast: boolean = false) => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log('position', position, position.coords.latitude);
            setValue("latitude", position?.coords?.latitude?.toString());
            setValue("longitude", position?.coords?.longitude?.toString());
            if (!hiddenToast) {
                showToast({
                    severity: "success",
                    summary: "Thông báo",
                    message: "Lấy vị trí thành công",
                    life: 3000,
                })
            }
        });
    };


    useEffect(() => {
        const actions: IAction[] = [
            {
                title: "Trở lại",
                severity: "secondary",
                action: "back",
            },
            {
                onClick: handleSubmit(onSubmit),
                title: "Tạo",
                icon: "pi-plus",
                permission: "location:create",
            },
        ];
        setFooterActions(actions);
        handleGetLocation(true)
        setHeaderTitle("Tạo vị trí");

        return () => {
            resetActions();
        };
    }, []);

    const latitude = watch("latitude");
    const longitude = watch("longitude");


    console.log('lattitude', latitude);
    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
                {LocationForm.map((form, index) => (
                    <GroupItem errors={errors} {...form} key={index} control={control} />
                ))}
                <MyCard title="Vị trí">
                    <Message text="Vui lòng sử dụng điện thoại bật GPS để đảm bảo lấy vị trí chính xác nhất." />
                    <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-mt-4">
                        <div>
                            <label className="tw-mb-1 block">Vĩ độ</label>
                            <InputText value={`${latitude}`} readOnly={true} disabled={true} placeholder="Vĩ độ" className="tw-w-full" />
                        </div>
                        <div>
                            <label className="tw-mb-1 block">Kinh độ</label>
                            <InputText value={`${longitude}`} readOnly={true} disabled={true} placeholder="Vĩ độ" className="tw-w-full" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <Button onClick={() => handleGetLocation(false)} label="Lấy vị trí hiện tại"></Button>
                    </div>

                </MyCard>
            </form>
        </div>
    );
};

export default CreateLocation;
