import GaugeComponent from "react-gauge-component";
import Typography from "@mui/material/Typography";
import {Stack} from "@mui/material";
import {abbreviateNumber} from "../../lib/converters.ts";
import Paper from "@mui/material/Paper";
import {useTheme} from "@mui/material/styles";

interface IConnectionGauge {
    label: string,
    rate: number,
    throughput: number,
    maxRate?: number,
}

export default function ConnectionGauge({label, rate, throughput, maxRate}: IConnectionGauge) {

    const {palette} = useTheme()
    const throughputPerSecond = abbreviateNumber(throughput) + "/s"
    const arc = {
        subArcs: [
            {
                limit: 1000,
                color: palette.success.main,
                showTick: true
            },
            {
                limit: 9000,
                color: palette.warning.main,
                showTick: true
            },
            {
                limit: 10000,
                color: palette.error.main,
                showTick: true
            }
        ]
    }
    const bgColor = palette.background.default

    return (
        <Paper square={false} sx={{padding: "0.6rem 0", bgcolor: bgColor}}>
            <Stack alignItems={"center"}>
                <Typography variant={"subtitle1"}>{label}</Typography>
                <GaugeComponent value={rate} maxValue={maxRate} arc={arc} labels={{
                    valueLabel: {formatTextValue: abbreviateNumber,}
                }}/>
                <Typography>Throughput: {throughputPerSecond}</Typography>
            </Stack>
        </Paper>

    )
}
