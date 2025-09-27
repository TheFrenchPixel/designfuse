import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Shuffle, Share2, Upload, Sparkles, Mail, MessageCircle, Twitter, Facebook, Linkedin, Instagram, Camera, FolderOpen } from 'lucide-react';
import { generateRandomBrief, generateBriefContent, Brief } from '@/lib/briefGenerator';
import { saveBrief } from '@/lib/storage';
import { incrementShareCount, updateBadges, getBadges, Badge as BadgeType } from '@/lib/badges';
import { getTranslation, getCurrentLanguage, Translation } from '@/lib/translations';
import { toast } from 'sonner';
import BadgeNotification from '@/components/BadgeNotification';

export default function CreateBrief() {
  const [brief, setBrief] = useState<Brief | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showBadgeNotification, setShowBadgeNotification] = useState(false);
  const [newBadge, setNewBadge] = useState<BadgeType | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentBrand, setCurrentBrand] = useState('Apple');
  const [currentProduct, setCurrentProduct] = useState('Smartphone');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  
  const currentLanguage = getCurrentLanguage();
  const t = (key: keyof Translation) => getTranslation(key, currentLanguage);

  // Sample data for spinning animation
  const sampleBrands = ['Apple', 'Nike', 'Google', 'Tesla', 'Samsung', 'Adidas', 'Microsoft', 'Sony', 'Netflix', 'Spotify', 'Amazon', 'Meta', 'Adobe', 'Intel', 'NVIDIA'];
  const sampleProducts = ['Smartphone', 'Sneakers', 'Laptop', 'Headphones', 'Smartwatch', 'Backpack', 'Gaming Console', 'Tablet', 'Speaker', 'Camera', 'Fitness Tracker', 'Water Bottle'];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setIsSpinning(true);
    
    // Start spinning animation
    let spinCount = 0;
    const spinInterval = setInterval(() => {
      setCurrentBrand(sampleBrands[Math.floor(Math.random() * sampleBrands.length)]);
      setCurrentProduct(sampleProducts[Math.floor(Math.random() * sampleProducts.length)]);
      spinCount++;
      
      if (spinCount >= 25) { // Spin for 2.5 seconds (25 * 100ms)
        clearInterval(spinInterval);
        
        // Generate the actual brief
        const briefComponents = generateRandomBrief();
        const briefContent = generateBriefContent(
          briefComponents.productType,
          briefComponents.brand,
          briefComponents.targetAudience,
          briefComponents.creativeSpark
        );
        
        // Set final values
        setCurrentBrand(briefComponents.brand);
        setCurrentProduct(briefComponents.productType);
        setIsSpinning(false);
        
        // Create complete brief object
        const newBrief: Brief = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          title: briefContent.title,
          overview: briefContent.overview,
          productType: briefComponents.productType,
          brand: briefComponents.brand,
          targetAudience: briefComponents.targetAudience,
          designRequirements: briefContent.designRequirements,
          timeline: briefContent.timeline,
          creativeSpark: briefComponents.creativeSpark,
          createdAt: new Date()
        };
        
        setBrief(newBrief);
        saveBrief(newBrief);
        
        // Check for new badges after brief generation
        const earnedBadges = updateBadges();
        
        if (earnedBadges.length > 0) {
          setNewBadge(earnedBadges[0]);
          setShowBadgeNotification(true);
        }
        
        setIsGenerating(false);
        toast.success('New creative challenge generated! 🎨');
      }
    }, 100);
  };

  const handleShare = (platform: string) => {
    if (!brief) return;

    const shareText = `🎨 ${brief.title}\n\n${brief.overview}\n\n✨ ${t('creativeSpark')}: ${brief.creativeSpark}`;
    const encodedText = encodeURIComponent(shareText);
    const encodedTitle = encodeURIComponent(brief.title);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'email': {
        shareUrl = `mailto:?subject=${encodedTitle}&body=${encodedText}`;
        break;
      }
      case 'whatsapp': {
        shareUrl = `https://wa.me/?text=${encodedText}`;
        break;
      }
      case 'twitter': {
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
        break;
      }
      case 'facebook': {
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodedText}`;
        break;
      }
      case 'linkedin': {
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&title=${encodedTitle}&summary=${encodedText}`;
        break;
      }
      case 'instagram': {
        navigator.clipboard.writeText(shareText);
        toast.success('Brief copied to clipboard! Paste it in your Instagram story 📋');
        incrementShareCount();
        const earnedBadges = updateBadges();
        if (earnedBadges.length > 0) {
          setNewBadge(earnedBadges[0]);
          setShowBadgeNotification(true);
        }
        return;
      }
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
      toast.success('Opening share dialog! 📤');
      incrementShareCount();
      const earnedBadges = updateBadges();
      if (earnedBadges.length > 0) {
        setNewBadge(earnedBadges[0]);
        setShowBadgeNotification(true);
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      toast.success(`${file.name} uploaded successfully! 📁`);
    };
    reader.readAsDataURL(file);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      toast.success('Photo captured successfully! 📸');
    };
    reader.readAsDataURL(file);

    // Reset input
    if (cameraInputRef.current) {
      cameraInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-3 pb-20 md:pb-4 text-sm">
      <div className="max-w-2xl mx-auto space-y-5">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-teal-400 mb-2">{t('dailyBrief')}</h1>
          <p className="text-slate-400 text-xs md:text-sm">Get inspired with a new creative challenge</p>
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-teal-400 text-lg">Creative Challenge Generator</CardTitle>
            <CardDescription className="text-slate-400 text-xs">
              Discover your next creative project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Spinning Wheels - Mobile: vertical stack, Desktop: horizontal */}
            <div className="bg-gradient-to-r from-slate-700 to-slate-600 p-4 rounded-lg border border-teal-500/30 mb-4">
              {isSpinning && (
                <div className="text-center mb-3">
                  <div className="text-teal-400 text-xs animate-pulse">
                    Generating challenge...
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Brand - First on mobile (top), left on desktop */}
                <div className="text-center">
                  <div className="text-teal-300 font-medium mb-2 text-xs">BRAND</div>
                  <div className="bg-slate-800 rounded-lg p-3 min-h-[60px] flex items-center justify-center border border-slate-600">
                    <span className={`text-teal-400 font-bold text-sm ${isSpinning ? 'animate-pulse' : ''}`}>
                      {currentBrand}
                    </span>
                  </div>
                </div>
                
                {/* Product - Second on mobile (bottom), right on desktop */}
                <div className="text-center">
                  <div className="text-cyan-300 font-medium mb-2 text-xs">PRODUCT</div>
                  <div className="bg-slate-800 rounded-lg p-3 min-h-[60px] flex items-center justify-center border border-slate-600">
                    <span className={`text-cyan-400 font-bold text-sm ${isSpinning ? 'animate-pulse' : ''}`}>
                      {currentProduct}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-medium py-4 text-base disabled:opacity-50"
            >
              {isGenerating ? (
                <div className="flex items-center">
                  <Shuffle className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </div>
              ) : (
                <div className="flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  {t('createBrief')}
                </div>
              )}
            </Button>

            {brief && !isSpinning && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Separator className="bg-slate-600" />
                
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-teal-400">{brief.title}</h2>
                  
                  <div className="bg-slate-700 p-4 rounded-lg">
                    <h3 className="text-teal-300 font-medium mb-2 text-sm">Project Overview</h3>
                    <p className="text-slate-200 text-sm leading-relaxed">{brief.overview}</p>
                  </div>

                  <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 p-4 rounded-lg">
                    <h3 className="text-teal-300 font-medium mb-2 flex items-center text-sm">
                      <Sparkles className="w-4 h-4 mr-2" />
                      {t('creativeSpark')}
                    </h3>
                    <p className="text-teal-100 text-sm leading-relaxed">{brief.creativeSpark}</p>
                  </div>

                  {/* Update Design Section */}
                  <div className="bg-slate-700 p-4 rounded-lg">
                    <h3 className="text-teal-300 font-medium mb-3 flex items-center text-sm">
                      <Upload className="w-4 h-4 mr-2" />
                      {t('updateDesign')}
                    </h3>
                    
                    {/* Upload Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      {/* Choose from Computer */}
                      <Label htmlFor="design-file-upload" className="cursor-pointer">
                        <div className="border-2 border-dashed border-slate-600 rounded-lg p-3 text-center hover:border-teal-500 hover:bg-slate-600/50 transition-colors">
                          <FolderOpen className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                          <p className="text-slate-400 text-xs mb-2">{t('chooseFromComputer')}</p>
                          <Button variant="outline" className="border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-white pointer-events-none text-xs px-2 py-1">
                            {t('chooseImage')}
                          </Button>
                        </div>
                        <Input
                          ref={fileInputRef}
                          id="design-file-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </Label>

                      {/* Take Photo */}
                      <Label htmlFor="design-camera-capture" className="cursor-pointer">
                        <div className="border-2 border-dashed border-slate-600 rounded-lg p-3 text-center hover:border-teal-500 hover:bg-slate-600/50 transition-colors">
                          <Camera className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                          <p className="text-slate-400 text-xs mb-2">{t('takePhoto')}</p>
                          <Button variant="outline" className="border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-white pointer-events-none text-xs px-2 py-1">
                            {t('takePhoto')}
                          </Button>
                        </div>
                        <Input
                          ref={cameraInputRef}
                          id="design-camera-capture"
                          type="file"
                          accept="image/*"
                          capture="environment"
                          onChange={handleCameraCapture}
                          className="hidden"
                        />
                      </Label>
                    </div>

                    {/* Display uploaded image */}
                    {uploadedImage && (
                      <div className="mt-3">
                        <img
                          src={uploadedImage}
                          alt="Uploaded design"
                          className="w-full max-w-xs mx-auto rounded-lg border border-slate-600"
                        />
                        <p className="text-center text-slate-400 text-xs mt-2">Your design upload</p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-white text-sm px-4"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          {t('share')} Challenge
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-slate-800 border-slate-700">
                        <DropdownMenuItem onClick={() => handleShare('email')} className="text-slate-300 hover:bg-slate-700 hover:text-teal-400 text-xs">
                          <Mail className="w-4 h-4 mr-2" />
                          {t('email')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare('whatsapp')} className="text-slate-300 hover:bg-slate-700 hover:text-teal-400 text-xs">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          {t('whatsapp')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare('twitter')} className="text-slate-300 hover:bg-slate-700 hover:text-teal-400 text-xs">
                          <Twitter className="w-4 h-4 mr-2" />
                          {t('twitter')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare('facebook')} className="text-slate-300 hover:bg-slate-700 hover:text-teal-400 text-xs">
                          <Facebook className="w-4 h-4 mr-2" />
                          {t('facebook')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare('linkedin')} className="text-slate-300 hover:bg-slate-700 hover:text-teal-400 text-xs">
                          <Linkedin className="w-4 h-4 mr-2" />
                          {t('linkedin')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare('instagram')} className="text-slate-300 hover:bg-slate-700 hover:text-teal-400 text-xs">
                          <Instagram className="w-4 h-4 mr-2" />
                          {t('instagram')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {showBadgeNotification && newBadge && (
          <BadgeNotification
            badge={newBadge}
            onClose={() => setShowBadgeNotification(false)}
          />
        )}
      </div>
    </div>
  );
}