import 'package:flutter/material.dart';

class FarmerAnalyticsPage extends StatelessWidget {
  const FarmerAnalyticsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: const [
            AnalyticsHeader(),
            SizedBox(height: 20),
            SummaryCards(),
            SizedBox(height: 24),
            PriceTrendsSection(),
            SizedBox(height: 24),
            DemandForecastSection(),
            SizedBox(height: 24),
            CostOptimizationSection(),
            SizedBox(height: 24),
            RecentPurchasesSection(),
            SizedBox(height: 80),
          ],
        ),
      ),
    );
  }
}

class AnalyticsHeader extends StatelessWidget {
  const AnalyticsHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        const Text(
          'Analytics',
          style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
        ),
        IconButton(
          onPressed: () {},
          icon: const Icon(Icons.tune),
        )
      ],
    );
  }
}

class SummaryCards extends StatelessWidget {
  const SummaryCards({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: const [
        Expanded(
          child: SummaryCard(
            title: 'Total Spent',
            value: '₹42,500',
            icon: Icons.account_balance_wallet,
            color: Color(0xFF2E7D32),
          ),
        ),
        SizedBox(width: 12),
        Expanded(
          child: SummaryCard(
            title: 'Total Savings',
            value: '₹3,210',
            icon: Icons.thumb_up,
            color: Colors.teal,
          ),
        ),
      ],
    );
  }
}

class SummaryCard extends StatelessWidget {
  final String title;
  final String value;
  final IconData icon;
  final Color color;

  const SummaryCard({
    super.key,
    required this.title,
    required this.value,
    required this.icon,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: color.withOpacity(0.12),
        borderRadius: BorderRadius.circular(18),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: color),
          const SizedBox(height: 8),
          Text(title, style: const TextStyle(color: Colors.grey)),
          const SizedBox(height: 4),
          Text(
            value,
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}

class PriceTrendsSection extends StatelessWidget {
  const PriceTrendsSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: const [
            Text(
              'Price Trends',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
            ),
            Chip(
              label: Text('+4% Today'),
              backgroundColor: Color(0xFFDFF3E3),
            ),
          ],
        ),
        const SizedBox(height: 8),
        const Text(
          'Wheat (Grade A) • Last 7 days',
          style: TextStyle(color: Colors.grey),
        ),
        const SizedBox(height: 12),
      
      ],
    );
  }
}


class DemandForecastSection extends StatelessWidget {
  const DemandForecastSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFFE8F5E9),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: const [
          Text(
            'Demand Forecast',
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 8),
          Text(
            'Tomatoes (Hybrid)',
            style: TextStyle(fontWeight: FontWeight.w600),
          ),
          SizedBox(height: 4),
          Text(
            'Prices likely to rise by 15% in 2 weeks',
            style: TextStyle(color: Colors.green),
          ),
          SizedBox(height: 8),
          Text(
            'Onions (Red)',
            style: TextStyle(fontWeight: FontWeight.w600),
          ),
          SizedBox(height: 4),
          Text(
            'Steady Market',
            style: TextStyle(color: Colors.orange),
          ),
        ],
      ),
    );
  }
}


class CostOptimizationSection extends StatelessWidget {
  const CostOptimizationSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        Text(
          'Cost Optimization',
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
        ),
        SizedBox(height: 12),
        OptimizationCard(
          title: 'Bundle Delivery',
          subtitle:
              'Combine Wheat and Rice orders to save ₹450 on shipping.',
          action: 'View Options',
        ),
        OptimizationCard(
          title: 'Wait for Harvest',
          subtitle:
              'Potatoes will be cheaper in 5 days as Punjab harvest peaks.',
          action: 'Set Reminder',
        ),
      ],
    );
  }
}

class OptimizationCard extends StatelessWidget {
  final String title;
  final String subtitle;
  final String action;

  const OptimizationCard({
    super.key,
    required this.title,
    required this.subtitle,
    required this.action,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
      ),
      child: Row(
        children: [
          const Icon(Icons.lightbulb, color: Color(0xFF2E7D32)),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title,
                    style: const TextStyle(fontWeight: FontWeight.bold)),
                const SizedBox(height: 4),
                Text(subtitle,
                    style: const TextStyle(color: Colors.grey, fontSize: 12)),
              ],
            ),
          ),
          TextButton(onPressed: () {}, child: Text(action)),
        ],
      ),
    );
  }
}


class RecentPurchasesSection extends StatelessWidget {
  const RecentPurchasesSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Recent Purchases',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
            ),
            Text(
              'See All',
              style: TextStyle(color: Color(0xFF2E7D32)),
            ),
          ],
        ),
        SizedBox(height: 12),
        PurchaseTile(
          crop: 'Potatoes (Desi)',
          price: '₹3,400',
          status: 'Completed',
        ),
        PurchaseTile(
          crop: 'Wheat (Premium)',
          price: '₹11,250',
          status: 'Completed',
        ),
        PurchaseTile(
          crop: 'Basmati Rice',
          price: '₹8,900',
          status: 'Completed',
        ),
      ],
    );
  }
}

class PurchaseTile extends StatelessWidget {
  final String crop;
  final String price;
  final String status;

  const PurchaseTile({
    super.key,
    required this.crop,
    required this.price,
    required this.status,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: [
          const CircleAvatar(
            backgroundColor: Color(0xFFDFF3E3),
            child: Icon(Icons.agriculture, color: Color(0xFF2E7D32)),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(crop,
                    style: const TextStyle(fontWeight: FontWeight.bold)),
                Text(price,
                    style: const TextStyle(color: Colors.grey, fontSize: 12)),
              ],
            ),
          ),
          Chip(
            label: Text(status),
            backgroundColor: const Color(0xFFDFF3E3),
          ),
        ],
      ),
    );
  }
}

