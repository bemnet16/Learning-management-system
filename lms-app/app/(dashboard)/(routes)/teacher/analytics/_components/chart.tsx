"use client"

import { Card } from "@/components/ui/card"
import {
Bar,
BarChart,
ResponsiveContainer,
XAxis,
YAxis
} from "recharts"


interface chartProps{
    data: {
        name: string,
        total: number
    }[]
}


export const Chart = ({data}: chartProps) => {
    return(
      <Card>
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data} >
                <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                />
                <YAxis 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
                />

                <Bar 
                dataKey="total"
                fill="#0369af"
                radius={[4,4,0,0]} />
            </BarChart>
        </ResponsiveContainer>
      </Card>
    )
}