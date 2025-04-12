import PageHead from '@/components/shared/page-head.jsx';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs.js';
import {RecentSales} from './components/recent-sales.js';
import { Button } from '@/components/ui/button.js';
import { ArrowDownIcon, ArrowUpIcon, DollarSignIcon, PercentIcon, ShoppingCartIcon, UsersIcon } from 'lucide-react';
import { RevenuePie, UserGrowth, Overview } from './components/overview.js';

export default function DashboardPage() {
  return (
    <>
      <PageHead title="Dashboard | App" />
      <div className="max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            Dashboard Overview
          </h2>
          <div className="flex gap-2">
            <Button variant="outline">Last 30 days</Button>
            <Button>Download Report</Button>
          </div>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm">Total Revenue</CardTitle>
                  <DollarSignIcon className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <div className="flex items-center text-sm text-green-500">
                    <ArrowUpIcon className="mr-1 h-3 w-3" /> 20.1%
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm">Active Users</CardTitle>
                  <UsersIcon className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,342</div>
                  <div className="flex items-center text-sm text-red-500">
                    <ArrowDownIcon className="mr-1 h-3 w-3" /> 5.3%
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm">Conversion Rate</CardTitle>
                  <PercentIcon className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.42%</div>
                  <div className="flex items-center text-sm text-green-500">
                    <ArrowUpIcon className="mr-1 h-3 w-3" /> 2.6%
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm">Avg. Order Value</CardTitle>
                  <ShoppingCartIcon className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$156.20</div>
                  <div className="flex items-center text-sm text-green-500">
                    <ArrowUpIcon className="mr-1 h-3 w-3" /> 7.8%
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <Overview />
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Sales Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <RevenuePie />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <UserGrowth />
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
