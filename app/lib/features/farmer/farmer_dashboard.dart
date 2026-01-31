import 'package:flutter/material.dart';

class FarmerDashboard extends StatelessWidget {
  const FarmerDashboard({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: const [
            DashboardHeader(),
            SizedBox(height: 16),
            WeatherCard(),
            SizedBox(height: 24),
            AIRatesSection(),
            SizedBox(height: 24),
            BuyerInterestSection(),
            SizedBox(height: 24),
            QuickActionsSection(),
            SizedBox(height: 80),
          ],
        ),
      ),
    );
  }
}


class DashboardHeader extends StatelessWidget {
  const DashboardHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: const [
            Text(
              '🌿 Good Morning',
              style: TextStyle(color: Colors.grey),
            ),
            SizedBox(height: 4),
            Text(
              'Namaste, Rajesh Ji',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
        const CircleAvatar(
          radius: 22,
          backgroundColor: Color(0xFFDFF3E3),
          child: Icon(Icons.person, color: Color(0xFF2E7D32)),
        ),
      ],
    );
  }
}


class WeatherCard extends StatelessWidget {
  const WeatherCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: const Color(0xFF4CAF50),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: const [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Weather in Punjab', style: TextStyle(color: Colors.white70)),
              SizedBox(height: 6),
              Text(
                '28°C Sunny',
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              SizedBox(height: 4),
              Text(
                'Best for Wheat Harvest',
                style: TextStyle(color: Colors.white70),
              ),
            ],
          ),
          Icon(Icons.wb_sunny, color: Colors.yellow, size: 40),
        ],
      ),
    );
  }
}

class AIRatesSection extends StatelessWidget {
  const AIRatesSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: const [
            Text(
              "Today's AI Rates",
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
            ),
            Text('See All', style: TextStyle(color: Color(0xFF2E7D32))),
          ],
        ),
        const SizedBox(height: 12),
        SizedBox(
          height: 110,
          child: ListView(
            scrollDirection: Axis.horizontal,
            children: const [
              AIRateCard('Wheat', '₹2,125', '+4.2%', true),
              AIRateCard('Tomato', '₹1,850', '-1.5%', false),
              AIRateCard('Corn', '₹1,400', '+2.1%', true),
            ],
          ),
        ),
      ],
    );
  }
}


class AIRateCard extends StatelessWidget {
  final String crop;
  final String price;
  final String change;
  final bool up;

  const AIRateCard(this.crop, this.price, this.change, this.up, {super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 130,
      margin: const EdgeInsets.only(right: 12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(crop, style: const TextStyle(fontWeight: FontWeight.w600)),
          const Spacer(),
          Text(price, style: const TextStyle(fontWeight: FontWeight.bold)),
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


class BuyerInterestSection extends StatelessWidget {
  const BuyerInterestSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        Text(
          'Buyer Interests',
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
        ),
        SizedBox(height: 12),
        BuyerInterestCard(
          buyer: 'FreshMart Exports',
          request: 'Wants 500kg Wheat @ ₹2,200',
        ),
        BuyerInterestCard(
          buyer: 'AgriLogistics Co.',
          request: 'Quote for Organic Basmati',
        ),
      ],
    );
  }
}


class BuyerInterestCard extends StatelessWidget {
  final String buyer;
  final String request;

  const BuyerInterestCard({
    super.key,
    required this.buyer,
    required this.request,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(buyer, style: const TextStyle(fontWeight: FontWeight.bold)),
          const SizedBox(height: 6),
          Text(request),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: ElevatedButton(
                  onPressed: () {},
                  child: const Text('Accept Offer'),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: OutlinedButton(
                  onPressed: () {},
                  child: const Text('Negotiate'),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}


class QuickActionsSection extends StatelessWidget {
  const QuickActionsSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Quick Actions',
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
        ),
        const SizedBox(height: 12),
        GridView.count(
          crossAxisCount: 2,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          mainAxisSpacing: 16,
          crossAxisSpacing: 16,
          children: const [
            QuickActionCard('Sell Crop', Icons.shopping_cart, Colors.green),
            QuickActionCard('Soil Analysis', Icons.science, Colors.brown),
            QuickActionCard('Track Truck', Icons.local_shipping, Colors.blue),
            QuickActionCard('Govt Scheme', Icons.account_balance, Colors.purple),
          ],
        ),
      ],
    );
  }
}


class QuickActionCard extends StatelessWidget {
  final String title;
  final IconData icon;
  final Color color;

  const QuickActionCard(this.title, this.icon, this.color, {super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: color.withOpacity(0.15),
        borderRadius: BorderRadius.circular(18),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, color: color, size: 28),
          const SizedBox(height: 10),
          Text(title, textAlign: TextAlign.center),
        ],
      ),
    );
  }
}

class BottomNavItem extends StatelessWidget {
  final IconData icon;
  final String label;
  final bool active;

  const BottomNavItem({
    super.key,
    required this.icon,
    required this.label,
    this.active = false,
  });

  @override
  Widget build(BuildContext context) {
    final color = active ? const Color(0xFF2E7D32) : Colors.grey;
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, color: color),
        Text(label, style: TextStyle(fontSize: 12, color: color)),
      ],
    );
  }
}
