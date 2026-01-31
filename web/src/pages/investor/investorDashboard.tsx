import { useState, useEffect } from "react";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, PieChart, ArrowUpRight, Loader2 } from "lucide-react";
import { investmentService, InvestmentOpportunity } from "@/services/investmentService";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export function InvestorDashboard() {
    const { user } = useAuth();
    const [opportunities, setOpportunities] = useState<InvestmentOpportunity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOpportunities();
    }, []);

    const fetchOpportunities = async () => {
        try {
            const res = await investmentService.getOpportunities();
            setOpportunities(res.data || []);
        } catch (error) {
            console.error(error);
            toast({ title: "Error", description: "Failed to load opportunities", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    const handleInvest = async (projectId: string) => {
        try {
            await investmentService.invest(projectId, 1000); // Mock amount
            toast({ title: "Success", description: "Investment request sent!" });
        } catch (error) {
            toast({ title: "Error", description: "Investment failed", variant: "destructive" });
        }
    };

    return (
        <ResponsiveLayout title="Investor Dashboard">
            <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-emerald-100 rounded-full text-emerald-600"><DollarSign /></div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Invested</p>
                                    <h3 className="text-2xl font-bold">₹0</h3>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-100 rounded-full text-blue-600"><TrendingUp /></div>
                                <div>
                                    <p className="text-sm text-muted-foreground">ROI</p>
                                    <h3 className="text-2xl font-bold">+0%</h3>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-purple-100 rounded-full text-purple-600"><PieChart /></div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Active Projects</p>
                                    <h3 className="text-2xl font-bold">0</h3>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Opportunities */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Investment Opportunities</h2>
                    {loading ? <Loader2 className="animate-spin" /> : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {opportunities.map(op => (
                                <Card key={op._id} className="card-hover">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-lg">{op.title}</CardTitle>
                                                <CardDescription>{op.farmerName}</CardDescription>
                                            </div>
                                            <Badge variant={op.riskLevel === 'Low' ? 'default' : 'destructive'}>{op.riskLevel} Risk</Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-sm text-muted-foreground line-clamp-2">{op.description}</p>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-muted-foreground">Target</p>
                                                <p className="font-semibold">₹{op.amountRequired.toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">Exp. ROI</p>
                                                <p className="font-semibold text-emerald-600">{op.roi}%</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">Duration</p>
                                                <p className="font-semibold">{op.duration}</p>
                                            </div>
                                        </div>
                                        <Button className="w-full" onClick={() => handleInvest(op._id)}>
                                            Invest Now <ArrowUpRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                            {opportunities.length === 0 && <p className="text-muted-foreground">No active opportunities found.</p>}
                        </div>
                    )}
                </div>
            </div>
        </ResponsiveLayout>
    );
}
