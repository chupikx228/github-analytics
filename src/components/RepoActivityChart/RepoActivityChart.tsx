import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import useGitHubRepos from "../../hooks/useGithubRepos.ts";
import styles from './RepoActivityChart.module.scss';
import {useMemo} from "react";


interface RepoActivityChartProps {
    userA: string;
    userB?: string;
}

interface ChartDataPoint {
    label: string;
    [username: string]: string | number;
}


const toMonthKey = (iso: string): string => iso.slice(0, 7);

const formatMonthLabel = (key: string): string => {
    const [year, month] = key.split("-");
    return new Date(Number(year), Number(month) - 1, 1).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });
};

const buildCumulative = (dates: string[]): Record<string, number> => {
    const counts: Record<string, number> = {};
    for (const d of dates) {
        const key = toMonthKey(d);
        counts[key] = (counts[key] ?? 0) + 1;
    }
    const sorted = Object.keys(counts).sort();
    const result: Record<string, number> = {};
    let total = 0;
    for (const key of sorted) {
        total += counts[key];
        result[key] = total;
    }
    return result;
};

const mergeDataSets = (
    userA: string,
    cumA: Record<string, number>,
    userB?: string,
    cumB?: Record<string, number>
): ChartDataPoint[] => {
    const allMonths = Array.from(
        new Set([...Object.keys(cumA), ...Object.keys(cumB ?? {})])
    ).sort();

    let lastA = 0;
    let lastB = 0;

    return allMonths.map((month) => {
        if (cumA[month] !== undefined) lastA = cumA[month];
        if (cumB && cumB[month] !== undefined) lastB = cumB[month];
        const point: ChartDataPoint = { label: formatMonthLabel(month), [userA]: lastA };
        if (userB) point[userB] = lastB;
        return point;
    });
};


interface TooltipEntry {
    name: string;
    value: number;
    color: string;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: TooltipEntry[];
    label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (!active || !payload?.length) return null;
    return (
        <div className={styles.tooltip}>
            <p className={styles.tooltipLabel}>{label}</p>
            {payload.map((entry) => (
                <p key={entry.name} className={styles.tooltipEntry} style={{ color: entry.color }}>
                    <span className={styles.tooltipEntryName}>{entry.name}</span> — {entry.value} Repos
                </p>
            ))}
        </div>
    );
};

const COLOR_A = "#378ADD";
const COLOR_B = "#D85A30";

const RepoActivityChart = ({ userA, userB }: RepoActivityChartProps) => {
    const { data: reposA, isLoading: loadingA, isError: errorA } = useGitHubRepos(userA);
    const { data: reposB, isLoading: loadingB, isError: errorB } = useGitHubRepos(userB ?? "");

    const chartData = useMemo(() => mergeDataSets (
        userA,
        buildCumulative((reposA ?? []).map((r) => r.created_at)),
        userB,
        userB ? buildCumulative((reposB ?? []).map((r) => r.created_at)) : undefined
    ), [userA, userB, reposA, reposB])


    if (loadingA || (userB && loadingB)) {
        return (
            <p className={styles.stateText}>
                Load....
            </p>
        );
    }

    if (errorA || (userB && errorB)) {
        return (
            <p className={styles.stateTextError}>
                Error: {errorA ?? errorB}
            </p>
        );
    }


    const tickInterval = Math.max(1, Math.floor(chartData.length / 18));

    const users = [{ user: userA, color: COLOR_A }, ...(userB ? [{ user: userB, color: COLOR_B }] : [])];

    return (
        <div className={styles.chart}>
            <div className={styles.chartLegend}>
                {users.map(({ user, color }) => (
                    <span key={user} className={styles.chartLegendItem}>
                        <span className={styles.chartLegendDot} style={{ background: color }} />
                        {user}
                    </span>
                ))}
            </div>

            <ResponsiveContainer width="100%" height={240}>
                <LineChart data={chartData} margin={{ top: 4, right: 50, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis
                        dataKey="label"
                        tick={{ fontSize: 12, fill: "#888780" }}
                        tickLine={false}
                        axisLine={false}
                        interval={tickInterval}
                    />
                    <YAxis
                        tick={{ fontSize: 12, fill: "#888780" }}
                        tickLine={false}
                        axisLine={false}
                        allowDecimals={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        type="monotone"
                        dataKey={userA}
                        stroke={COLOR_A}
                        strokeWidth={2.5}
                        dot={false}
                        activeDot={{ r: 4, strokeWidth: 0 }}
                    />
                    {userB && (
                        <Line
                            type="monotone"
                            dataKey={userB}
                            stroke={COLOR_B}
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4, strokeWidth: 0 }}
                        />
                    )}
                </LineChart>
            </ResponsiveContainer>

            <p className={styles.chartFooter}>
                Cumulative number of repositories by month
            </p>
        </div>
    );
};

export default RepoActivityChart;