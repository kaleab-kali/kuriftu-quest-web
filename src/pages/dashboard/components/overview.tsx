import { PieChart } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Enhanced data for demonstration
const barData = [
  { name: 'Jan', total: 4500, projected: 5000 },
  { name: 'Feb', total: 6200, projected: 5500 },
  { name: 'Mar', total: 7800, projected: 6000 },
  { name: 'Apr', total: 9100, projected: 6500 },
  { name: 'May', total: 10500, projected: 7000 },
  { name: 'Jun', total: 13200, projected: 7500 },
  { name: 'Jul', total: 14200, projected: 8000 },
  { name: 'Aug', total: 16800, projected: 8500 },
  { name: 'Sep', total: 18900, projected: 9000 },
  { name: 'Oct', total: 21000, projected: 9500 },
  { name: 'Nov', total: 23500, projected: 10000 },
  { name: 'Dec', total: 26800, projected: 10500 }
];

const pieData = [
  { name: 'Direct', value: 4000, color: '#adfa1d' },
  { name: 'Referral', value: 3000, color: '#82ca9d' },
  { name: 'Social', value: 2000, color: '#8884d8' },
  { name: 'Email', value: 1000, color: '#ffc658' }
];

const lineData = [
  { month: 'Jan', users: 4000, sessions: 2400 },
  { month: 'Feb', users: 4200, sessions: 2600 },
  { month: 'Mar', users: 4400, sessions: 2800 },
  { month: 'Apr', users: 4600, sessions: 3000 },
  { month: 'May', users: 4800, sessions: 3200 },
  { month: 'Jun', users: 5000, sessions: 3400 },
];

export function Overview() {
  return (
    <div className="h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
          <Bar dataKey="projected" fill="#82ca9d" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RevenuePie() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function UserGrowth() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={lineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#82ca9d" strokeWidth={2} />
          <Line type="monotone" dataKey="sessions" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}