import 'package:flutter/material.dart';
import '../../core/routes/app_routes.dart';

class RoleSelectionPage extends StatefulWidget {
  const RoleSelectionPage({super.key});

  @override
  State<RoleSelectionPage> createState() => _RoleSelectionPageState();
}

class _RoleSelectionPageState extends State<RoleSelectionPage> {
  String selectedRole = 'farmer'; // default

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            children: [
              // Header card (same visual language as first page)
              Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: const Color(0xFFDFF3E3),
                  borderRadius: BorderRadius.circular(28),
                ),
                child: Column(
                  children: const [
                    Text(
                      'Choose Your Role',
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF2E7D32),
                      ),
                    ),
                    SizedBox(height: 8),
                    Text(
                      'Tell us how you want to use Rhino',
                      textAlign: TextAlign.center,
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 28),

              const Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'SELECT ROLE',
                  style: TextStyle(
                    fontWeight: FontWeight.w600,
                    fontSize: 13,
                    letterSpacing: 0.8,
                  ),
                ),
              ),

              const SizedBox(height: 16),

              // Role boxes
              Expanded(
                child: Column(
                  children: [
                    RoleBox(
                      title: 'Farmer',
                      subtitle: 'Sell crops & get AI price insights',
                      icon: Icons.agriculture,
                      selected: selectedRole == 'farmer',
                      onTap: () {
                        setState(() => selectedRole = 'farmer');
                      },
                    ),
                    const SizedBox(height: 16),
                    RoleBox(
                      title: 'Buyer',
                      subtitle: 'Buy crops directly from farmers',
                      icon: Icons.storefront,
                      selected: selectedRole == 'buyer',
                      onTap: () {
                        setState(() => selectedRole = 'buyer');
                      },
                    ),
                  ],
                ),
              ),

              // Continue button
              SizedBox(
                width: double.infinity,
                height: 52,
                child: ElevatedButton(
                  onPressed: () {
                    if (selectedRole == 'farmer') {
                      Navigator.pushReplacementNamed(context, AppRoutes.farmerShell);
                      debugPrint('Farmer selected');
                    } else {
                      // Navigator.pushReplacementNamed(context, AppRoutes.buyerDashboard);
                      debugPrint('Buyer selected');
                    }
                  },
                  child: const Text('Continue'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}



class RoleBox extends StatelessWidget {
  final String title;
  final String subtitle;
  final IconData icon;
  final bool selected;
  final VoidCallback onTap;

  const RoleBox({
    super.key,
    required this.title,
    required this.subtitle,
    required this.icon,
    required this.selected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: selected ? const Color(0xFF2E7D32) : Colors.grey.shade300,
            width: 2,
          ),
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: const Color(0xFFDFF3E3),
                borderRadius: BorderRadius.circular(14),
              ),
              child: Icon(icon, size: 28, color: const Color(0xFF2E7D32)),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    subtitle,
                    style: const TextStyle(color: Colors.grey),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
