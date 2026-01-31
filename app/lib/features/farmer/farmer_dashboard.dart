import 'dart:convert';

import 'package:app/core/controllers/auth_controller.dart';
import 'package:app/features/account/account_page.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../core/controllers/auth_controller.dart';
import 'package:http/http.dart' as http;

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

  String getGreeting() {
    final hour = DateTime.now().hour;

    if (hour < 12) {
      return '🌿 Good Morning';
    } else if (hour < 17) {
      return '🌤 Good Afternoon';
    } else {
      return '🌙 Good Evening';
    }
  }

  @override
  Widget build(BuildContext context) {
    final auth = Get.find<AuthController>();
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(getGreeting(), style: const TextStyle(color: Colors.grey)),

            SizedBox(height: 4),
            Text(
              'Namaste, ${auth.user.value?.name ?? ''}',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
          ],
        ),
        Material(
          color: Colors.transparent,
          child: InkWell(
            borderRadius: BorderRadius.circular(22),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const AccountPage()),
              );
            },
            child: const CircleAvatar(
              radius: 22,
              backgroundColor: Color(0xFFDFF3E3),
              child: Icon(Icons.person, color: Color(0xFF2E7D32)),
            ),
          ),
        ),
      ],
    );
  }
}

class WeatherCard extends StatefulWidget {
  const WeatherCard({super.key});

  @override
  State<WeatherCard> createState() => _WeatherCardState();
}

class _WeatherCardState extends State<WeatherCard> {
  String weatherText = 'Loading...';

  @override
  void initState() {
    super.initState();
    _loadWeather();
  }

  Future<void> _loadWeather() async {
    final auth = Get.find<AuthController>();

   final response = await http.post(
  Uri.parse('https://aee-hackathon.onrender.com/api/ai/crop-activity'),
  headers: {
    'Authorization': 'Bearer ${auth.token.value}',
    'Content-Type': 'application/json',
  },
  body: jsonEncode({
    'location': {
      'state': 'Karnataka',
    },
  }),
);


    if (response.statusCode == 200) {
      setState(() {
        weatherText = '28°C Sunny'; // parse real data later
      });
    }
  }

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
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Weather in Punjab',
                style: TextStyle(color: Colors.white70),
              ),
              const SizedBox(height: 6),
              Text(
                weatherText,
                style: const TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              const SizedBox(height: 4),
              const Text(
                'Best for Wheat Harvest',
                style: TextStyle(color: Colors.white70),
              ),
            ],
          ),
          const Icon(Icons.wb_sunny, color: Colors.yellow, size: 40),
        ],
      ),
    );
  }
}

class AIRateCard extends StatelessWidget {
  final String crop;
  final String price;
  final String change;
  final bool up;
  final String imagePath;

  const AIRateCard(
    this.crop,
    this.price,
    this.change,
    this.up, {
    super.key,
    required this.imagePath,
  });

  @override
  Widget build(BuildContext context) {
    final changeColor = up ? Colors.green : Colors.red;
    final arrow = up ? Icons.trending_up : Icons.trending_down;

    return Container(
      width: 130,
      margin: const EdgeInsets.only(right: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 8,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Image
          Container(
            height: 30,
            width: 30,
            padding: const EdgeInsets.all(5),
            decoration: BoxDecoration(
              color: const Color(0xFFDFF3E3),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Image.asset(imagePath, fit: BoxFit.contain),
          ),

          const Spacer(),

          Text(
            crop,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 12),
          ),

          const SizedBox(height: 1), // ✅ Reduced from 2

          Text(
            price,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
          ),

          const SizedBox(height: 2), // ✅ Reduced from 3

          Row(
            children: [
              Icon(arrow, size: 12, color: changeColor),
              const SizedBox(width: 3),
              Text(
                change,
                style: TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w600,
                  color: changeColor,
                ),
              ),
            ],
          ),
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
              AIRateCard(
                'Wheat',
                '₹2,125',
                '+4.2%',
                true,
                imagePath: 'assets/images/wheat.png',
              ),
              AIRateCard(
                'Tomato',
                '₹1,850',
                '-1.5%',
                false,
                imagePath: 'assets/images/tmt.png',
              ),
              AIRateCard(
                'Corn',
                '₹1,400',
                '+2.1%',
                true,
                imagePath: 'assets/images/corn.png',
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class BuyerInterestSection extends StatefulWidget {
  const BuyerInterestSection({super.key});

  @override
  State<BuyerInterestSection> createState() => _BuyerInterestSectionState();
}

class _BuyerInterestSectionState extends State<BuyerInterestSection> {
  bool loading = true;
  String? error;
  List<dynamic> demands = [];

  @override
  void initState() {
    super.initState();
    _fetchBuyerDemands();
  }

  Future<void> _fetchBuyerDemands() async {
    try {
      final auth = Get.find<AuthController>();

      final response = await http.get(
        Uri.parse(
          'https://aee-hackathon.onrender.com/api/farmers/buyer-demands',
        ),
        headers: {
          'Authorization': 'Bearer ${auth.token.value}',
        },
      );

      if (response.statusCode == 200) {
        final decoded = jsonDecode(response.body);
        setState(() {
          demands = decoded['data'] ?? [];
          loading = false;
        });
      } else {
        setState(() {
          error = 'Failed to load buyer demands';
          loading = false;
        });
      }
    } catch (e) {
      setState(() {
        error = 'Network error';
        loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Buyer Interests',
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
        ),
        const SizedBox(height: 12),

        if (loading)
          const Center(child: CircularProgressIndicator())
        else if (error != null)
          Text(error!, style: const TextStyle(color: Colors.red))
        else if (demands.isEmpty)
          const Text('No buyer requests yet')
        else
          SizedBox(
            height: 260, // ✅ bounded height → scrolls
            child: ListView.builder(
              itemCount: demands.length,
              itemBuilder: (context, index) {
                final item = demands[index];
                return BuyerInterestCard(
                  cropName: item['cropName'],
                  quantity: item['quantityRequired'],
                  grade: item['minQualityGrade'],
                  price: item['maxPricePerUnit'],
                  neededBy: item['neededByDate'],
                  status: item['status'],
                );
              },
            ),
          ),
      ],
    );
  }
}

class BuyerInterestCard extends StatelessWidget {
  final String cropName;
  final int quantity;
  final String grade;
  final int price;
  final String neededBy;
  final String status;

  const BuyerInterestCard({
    super.key,
    required this.cropName,
    required this.quantity,
    required this.grade,
    required this.price,
    required this.neededBy,
    required this.status,
  });

  @override
  Widget build(BuildContext context) {
    final date =
        DateTime.tryParse(neededBy)?.toLocal().toString().split(' ').first ??
            '';

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
          // Crop & status
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                cropName,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
              _StatusChip(status),
            ],
          ),

          const SizedBox(height: 8),

          Text('Quantity: $quantity kg'),
          Text('Quality Grade: $grade'),
          Text('Max Price: ₹$price / unit'),
          Text('Needed by: $date'),

          const SizedBox(height: 12),

          Row(
            children: [
              Expanded(
                child: ElevatedButton(
                  onPressed: () {},
                  child: const Text('Accept'),
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


class _StatusChip extends StatelessWidget {
  final String status;

  const _StatusChip(this.status);

  @override
  Widget build(BuildContext context) {
    final isOpen = status == 'OPEN';

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: isOpen ? Colors.green.shade100 : Colors.grey.shade300,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        status,
        style: TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.w600,
          color: isOpen ? Colors.green.shade800 : Colors.grey.shade700,
        ),
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
            QuickActionCard(
              'Govt Scheme',
              Icons.account_balance,
              Colors.purple,
            ),
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
