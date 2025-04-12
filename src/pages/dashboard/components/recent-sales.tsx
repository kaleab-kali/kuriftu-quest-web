import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export function RecentSales() {
  return (
    <div className="space-y-6">
      <div className="bg-muted flex items-center justify-between rounded-lg p-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">Total Sales Volume</p>
          <p className="text-2xl font-bold">$52,450.00</p>
          <Badge variant="outline" className="mt-2">
            <span className="text-green-500">▲</span> 12.5% from last month
          </Badge>
        </div>
        <div className="space-y-1 text-right">
          <p className="text-sm font-medium">Avg. Transaction</p>
          <p className="text-2xl font-bold">$234.00</p>
          <Badge variant="outline" className="mt-2">
            <span className="text-red-500">▼</span> 3.2% from last month
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        <div className="rounded-lg border">
          <div className="bg-muted grid grid-cols-4 px-4 py-2 font-medium">
            <div>Customer</div>
            <div>Status</div>
            <div>Date</div>
            <div className="text-right">Amount</div>
          </div>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="hover:bg-muted/50 grid grid-cols-4 px-4 py-2 transition-colors"
            >
              <div className="flex items-center">
                <Avatar className="mr-2 h-8 w-8">
                  <AvatarImage src={`/avatars/0${i + 1}.png`} />
                  <AvatarFallback>
                    {['OM', 'JL', 'IN', 'WK', 'SD'][i]}
                  </AvatarFallback>
                </Avatar>
                {
                  [
                    'Olivia Martin',
                    'Jackson Lee',
                    'Isabella Nguyen',
                    'William Kim',
                    'Sofia Davis'
                  ][i]
                }
              </div>
              <div>
                <Badge variant="default">Completed</Badge>
              </div>
              <div>2023-07-{15 + i}</div>
              <div className="text-right font-medium">
                ${[1999, 39, 299, 99, 39][i].toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
