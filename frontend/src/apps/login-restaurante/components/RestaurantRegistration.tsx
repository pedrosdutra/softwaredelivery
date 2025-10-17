import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import { Upload, MapPin, Phone, Mail, Clock, DollarSign, FileText, Camera, Store } from 'lucide-react';

interface RestaurantFormData {
  name: string;
  category: string;
  address: string;
  phone: string;
  email: string;
  cnpj: string;
  openTime: string;
  closeTime: string;
  deliveryFee: string;
  minOrderValue: string;
  logo: FileList | null;
  coverImage: FileList | null;
}

export function RestaurantRegistration() {
  const [step, setStep] = useState(1);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<RestaurantFormData>();

  const categories = [
    'Brasileira',
    'Italiana',
    'Japonesa',
    'Mexicana',
    'Árabe',
    'Chinesa',
    'Francesa',
    'Vegetariana',
    'Vegana',
    'Fast Food',
    'Pizza',
    'Hambúrguer',
    'Açaí',
    'Doces & Sobremesas',
    'Bebidas',
    'Outros'
  ];

  const handleFileUpload = (files: FileList | null, type: 'logo' | 'cover') => {
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === 'logo') {
          setLogoPreview(e.target?.result as string);
        } else {
          setCoverPreview(e.target?.result as string);
        }
      };
      reader.readAsDataURL(file);
      setValue(type === 'logo' ? 'logo' : 'coverImage', files);
    }
  };

  const onSubmit = (data: RestaurantFormData) => {
    console.log('Dados do restaurante:', data);
    toast.success('Cadastro realizado com sucesso! Aguarde nossa análise.');
  };

  const nextStep = async () => {
    let isValid = false;
    
    // Validar campos de cada etapa
    if (step === 1) {
      isValid = await trigger(['name', 'category']);
    } else if (step === 2) {
      isValid = await trigger(['address', 'phone', 'email']);
    }
    
    if (isValid) {
      setStep(Math.min(step + 1, 3));
    } else {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
    }
  };
  
  const prevStep = () => setStep(Math.max(step - 1, 1));

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {[1, 2, 3].map((number) => (
          <div key={number} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= number
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {number}
            </div>
            {number < 3 && (
              <div
                className={`w-16 h-1 ml-2 ${
                  step > number ? 'bg-orange-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="w-5 h-5 text-orange-500" />
            {step === 1 && 'Informações Básicas'}
            {step === 2 && 'Dados de Contato'}
            {step === 3 && 'Configurações e Imagens'}
          </CardTitle>
          <CardDescription>
            {step === 1 && 'Conte-nos sobre seu restaurante'}
            {step === 2 && 'Como os clientes podem te encontrar'}
            {step === 3 && 'Finalize seu cadastro'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Restaurante *</Label>
                  <Input
                    id="name"
                    {...register('name', { required: 'Nome é obrigatório' })}
                    placeholder="Ex: Pizzaria do João"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria *</Label>
                  <Select 
                    onValueChange={(value) => {
                      setValue('category', value, { shouldValidate: true });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <input 
                    type="hidden" 
                    {...register('category', { required: 'Categoria é obrigatória' })} 
                  />
                  {errors.category && (
                    <p className="text-sm text-red-500">{errors.category.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Contact Information */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Endereço Completo *
                  </Label>
                  <Textarea
                    id="address"
                    {...register('address', { required: 'Endereço é obrigatório' })}
                    placeholder="Rua, número, bairro, cidade, CEP"
                    rows={3}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500">{errors.address.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Telefone *
                    </Label>
                    <Input
                      id="phone"
                      {...register('phone', { required: 'Telefone é obrigatório' })}
                      placeholder="(11) 99999-9999"
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      E-mail *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email', { 
                        required: 'E-mail é obrigatório',
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: 'E-mail inválido'
                        }
                      })}
                      placeholder="contato@restaurante.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cnpj" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    CNPJ
                  </Label>
                  <Input
                    id="cnpj"
                    {...register('cnpj')}
                    placeholder="00.000.000/0001-00"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Settings and Images */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Horário de Funcionamento
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="openTime">Abertura</Label>
                      <Input
                        id="openTime"
                        type="time"
                        {...register('openTime')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="closeTime">Fechamento</Label>
                      <Input
                        id="closeTime"
                        type="time"
                        {...register('closeTime')}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Configurações de Entrega
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="deliveryFee">Taxa de Entrega (R$)</Label>
                      <Input
                        id="deliveryFee"
                        type="number"
                        step="0.01"
                        {...register('deliveryFee')}
                        placeholder="5.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="minOrderValue">Pedido Mínimo (R$)</Label>
                      <Input
                        id="minOrderValue"
                        type="number"
                        step="0.01"
                        {...register('minOrderValue')}
                        placeholder="20.00"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Imagens do Restaurante
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Logo Upload */}
                    <div className="space-y-2">
                      <Label>Logo do Restaurante</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-orange-500 transition-colors">
                        {logoPreview ? (
                          <div className="space-y-2">
                            <img
                              src={logoPreview}
                              alt="Logo preview"
                              className="w-20 h-20 object-cover rounded-lg mx-auto"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setLogoPreview(null);
                                setValue('logo', null);
                              }}
                            >
                              Remover
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                            <Label
                              htmlFor="logo"
                              className="cursor-pointer text-sm text-orange-500 hover:text-orange-600"
                            >
                              Clique para enviar o logo
                            </Label>
                            <Input
                              id="logo"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e.target.files, 'logo')}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Cover Image Upload */}
                    <div className="space-y-2">
                      <Label>Imagem de Capa</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-orange-500 transition-colors">
                        {coverPreview ? (
                          <div className="space-y-2">
                            <img
                              src={coverPreview}
                              alt="Cover preview"
                              className="w-full h-20 object-cover rounded-lg"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setCoverPreview(null);
                                setValue('coverImage', null);
                              }}
                            >
                              Remover
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                            <Label
                              htmlFor="coverImage"
                              className="cursor-pointer text-sm text-orange-500 hover:text-orange-600"
                            >
                              Clique para enviar a capa
                            </Label>
                            <Input
                              id="coverImage"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e.target.files, 'cover')}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
              >
                Anterior
              </Button>

              {step < 3 ? (
                <Button type="button" onClick={nextStep} className="bg-orange-500 hover:bg-orange-600">
                  Próximo
                </Button>
              ) : (
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                  Finalizar Cadastro
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}