import 'package:flutter/material.dart';

class BuyerHomePage extends StatelessWidget {
  const BuyerHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: const [
            BuyerHeader(),
            SizedBox(height: 20),
            MarketPricesSection(),
            SizedBox(height: 24),
            SupplyHeatmapSection(),
            SizedBox(height: 24),
            SmartPicksSection(),
            SizedBox(height: 24),
            ActiveOrdersSection(),
            SizedBox(height: 80),
          ],
        ),
      ),
    );
  }
}


class BuyerHeader extends StatelessWidget {
  const BuyerHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        const CircleAvatar(
          radius: 22,
          backgroundColor: Color(0xFFDFF3E3),
          child: Icon(Icons.person, color: Color(0xFF2E7D32)),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              Text('Namaste, Rajesh',
                  style: TextStyle(fontWeight: FontWeight.bold)),
              SizedBox(height: 2),
              Text(
                '📍 Nashik Mandi, MH',
                style: TextStyle(color: Colors.grey, fontSize: 12),
              ),
            ],
          ),
        ),
        IconButton(
          onPressed: () {},
          icon: const Icon(Icons.notifications_none),
        ),
      ],
    );
  }
}


class MarketPricesSection extends StatelessWidget {
  const MarketPricesSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: const [
            Text('Market Prices',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
            Text('View All',
                style: TextStyle(color: Color(0xFF2E7D32))),
          ],
        ),
        const SizedBox(height: 12),
        SizedBox(
          height: 120,
          child: ListView(
            scrollDirection: Axis.horizontal,
            children: const [
              MarketPriceCard('Tomato (Hybrid)', '₹24/kg', '+12%', true),
              MarketPriceCard('Wheat (Sonlika)', '₹2,150/q', '-4%', false),
              MarketPriceCard('Onion', '₹18/kg', '+6%', true),
            ],
          ),
        ),
      ],
    );
  }
}


class MarketPriceCard extends StatelessWidget {
  final String crop;
  final String price;
  final String change;
  final bool up;

  const MarketPriceCard(
      this.crop, this.price, this.change, this.up,
      {super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 150,
      margin: const EdgeInsets.only(right: 12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: const Color.fromARGB(255, 245, 242, 242),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(crop,
              style: const TextStyle(fontWeight: FontWeight.w600)),
          const Spacer(),
          Text(price,
              style: const TextStyle(
                  fontSize: 16, fontWeight: FontWeight.bold)),
          const SizedBox(height: 4),
          Text(
            change,
            style: TextStyle(color: up ? Colors.green : Colors.red),
          ),
        ],
      ),
    );
  }
}


class SupplyHeatmapSection extends StatelessWidget {
  const SupplyHeatmapSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: const [
            Text('Supply Heatmap',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
            Row(
              children: [
                Chip(label: Text('High')),
                SizedBox(width: 6),
                Chip(label: Text('Low')),
              ],
            ),
          ],
        ),
        const SizedBox(height: 12),
        Container(
          height: 160,
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(20),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Expanded(
                child: Center(
                  child: Text(
                    '🗺 Heatmap Placeholder',
                    style: TextStyle(color: Colors.grey),
                  ),
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: const [
                  Text('High supply in Satara Region',
                      style: TextStyle(fontSize: 12)),
                  Text('Find Trucks',
                      style: TextStyle(color: Color(0xFF2E7D32))),
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }
}


class SmartPicksSection extends StatelessWidget {
  const SmartPicksSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        Row(
          children: [
            Text('Smart Picks',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
            SizedBox(width: 6),
            Chip(label: Text('AI')),
          ],
        ),
        SizedBox(height: 12),
        SmartPickCard(
          title: 'Fresh Potato (Organic)',
          subtitle: '500kg available • 12km away',
          price: '₹16.50/kg',
          action: 'Buy Now',
        ),
        SmartPickCard(
          title: 'Sweet Corn (Grade A)',
          subtitle: '2 tons • Expected price drop',
          price: '₹22.00/kg',
          action: 'Pre-book',
        ),
      ],
    );
  }
}


class SmartPickCard extends StatelessWidget {
  final String title;
  final String subtitle;
  final String price;
  final String action;

  const SmartPickCard({
    super.key,
    required this.title,
    required this.subtitle,
    required this.price,
    required this.action,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Row(
        children: [
          const CircleAvatar(
            radius: 22,
            backgroundColor: Color(0xFFDFF3E3),
            child: Icon(Icons.eco, color: Color(0xFF2E7D32)),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title,
                    style: const TextStyle(fontWeight: FontWeight.bold)),
                Text(subtitle,
                    style: const TextStyle(color: Colors.grey, fontSize: 12)),
                const SizedBox(height: 6),
                Text(price,
                    style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF2E7D32))),
              ],
            ),
          ),
          ElevatedButton(
            onPressed: () {},
            child: Text(action),
          ),
        ],
      ),
    );
  }
}


class ActiveOrdersSection extends StatelessWidget {
  const ActiveOrdersSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        Text('Active Orders',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        SizedBox(height: 12),
        ActiveOrderCard(),
      ],
    );
  }
}

class ActiveOrderCard extends StatelessWidget {
  const ActiveOrderCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: const [
              Text('#ORD-9021',
                  style: TextStyle(fontWeight: FontWeight.bold)),
              Spacer(),
              Chip(
                label: Text('85% Processed'),
                backgroundColor: Color(0xFFDFF3E3),
              ),
            ],
          ),
          const SizedBox(height: 8),
          const Text('In-transit from Sangli',
              style: TextStyle(color: Colors.grey)),
          const SizedBox(height: 12),
          Row(
            children: const [
              CircleAvatar(radius: 10, child: Text('🌾')),
              SizedBox(width: 6),
              Text('Need help buying?',
                  style: TextStyle(fontSize: 12)),
              Spacer(),
              Text('1 PM',
                  style: TextStyle(color: Colors.grey, fontSize: 12)),
            ],
          )
        ],
      ),
    );
  }
}
