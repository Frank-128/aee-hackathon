import { Star } from "lucide-react";

import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { Card, CardContent } from "@/components/ui/card";

/* ============ BUYER REVIEWS ============ */

type Review = {
  id: number;
  farmer: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
};

/* ============ BUYER REVIEWS ============ */
export function BuyerReviews() {
  const reviews = [
    {
      id: 1,
      farmer: "Kumar Farm Estate",
      rating: 5,
      title: "Excellent Quality Rice",
      comment: "Premium quality basmati rice, fresh and well-packaged.",
      date: "2024-01-15",
    },
    {
      id: 2,
      farmer: "Green Valley Farms",
      rating: 4,
      title: "Good Tomatoes",
      comment: "Fresh tomatoes but delivery was slightly delayed.",
      date: "2024-01-10",
    },
  ];

  return (
    <ResponsiveLayout title="My Reviews">
      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id} className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold">{review.farmer}</h3>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="font-semibold mb-2">{review.title}</p>
              <p className="text-sm text-muted-foreground">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </ResponsiveLayout>
  );
}
