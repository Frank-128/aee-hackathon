import 'package:flutter/material.dart';
import '../../core/routes/app_routes.dart';

class WelcomeLanguagePage extends StatelessWidget {
  const WelcomeLanguagePage({super.key});

  @override
  Widget build(BuildContext context) {
    final List<Map<String, dynamic>> languages = [
  {'title': 'IN', 'subtitle': 'हिंदी', 'selected': true},
  {'title': 'GB', 'subtitle': 'English'},
  {'title': 'मराठी', 'subtitle': 'Marathi'},
  {'title': 'ਪੰਜਾਬੀ', 'subtitle': 'Punjabi'},
];

    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            children: [
              // Welcome Card
              Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: const Color(0xFFDFF3E3),
                  borderRadius: BorderRadius.circular(28),
                ),
                child: Column(
                  children: [
                    const Text(
                      'Welcome to',
                      style: TextStyle(fontSize: 20),
                    ),
                    const SizedBox(height: 4),
                    const Text(
                      'AgriMarket',
                      style: TextStyle(
                        fontSize: 26,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF2E7D32),
                      ),
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      'Join India’s smartest marketplace for farmers and buyers.',
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 20),

                    // Image placeholder (replace with asset later)
                    Container(
                      height: 120,
                      width: 120,
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: const Icon(
                        Icons.person,
                        size: 60,
                        color: Colors.grey,
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 28),

              // Language Section
              const Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'SELECT YOUR LANGUAGE',
                  style: TextStyle(
                    fontWeight: FontWeight.w600,
                    fontSize: 13,
                    letterSpacing: 0.8,
                  ),
                ),
              ),
              const SizedBox(height: 16),

              Expanded(
                child: GridView.builder(
  itemCount: languages.length,
  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 2,
    crossAxisSpacing: 16,
    mainAxisSpacing: 16,
    childAspectRatio: 1.2,
  ),
  itemBuilder: (context, index) {
    final lang = languages[index];
    return LanguageBox(
      title: lang['title']!,
      subtitle: lang['subtitle']!,
      selected: lang['selected'] ?? false,
    );
  },
)

              ),

              // Continue Button
              SizedBox(
                width: double.infinity,
                height: 52,
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.pushNamed(context, AppRoutes.roleSelection);
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


class LanguageBox extends StatelessWidget {
  final String title;
  final String subtitle;
  final bool selected;

  const LanguageBox({
    super.key,
    required this.title,
    required this.subtitle,
    this.selected = false,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: selected ? const Color(0xFF2E7D32) : Colors.grey.shade300,
          width: 2,
        ),
        color: Colors.white,
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            title,
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 6),
          Text(
            subtitle,
            style: const TextStyle(color: Colors.grey),
          ),
        ],
      ),
    );
  }
}
