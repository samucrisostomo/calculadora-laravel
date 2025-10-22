<?php

namespace App\Http\Controllers;

use App\Models\Taxa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaxaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $taxas = Taxa::orderBy('tipo_bem')
            ->orderBy('modalidade')
            ->orderBy('nome')
            ->get();

        return Inertia::render('Admin/Taxas/Index', [
            'taxas' => $taxas,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Taxas/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'codigo' => 'required|string|max:255|unique:taxas',
            'tipo_bem' => 'required|in:carro,imovel',
            'modalidade' => 'required|in:consorcio,financiamento',
            'tipo_taxa' => 'required|in:percentual,fixo',
            'valor' => 'required|numeric|min:0',
            'periodo' => 'nullable|string|in:mensal,anual,unico',
            'descricao' => 'nullable|string',
            'ativo' => 'boolean',
        ]);

        Taxa::create($validated);

        return redirect()->route('admin.taxas.index')
            ->with('success', 'Taxa criada com sucesso!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Taxa $taxa)
    {
        return Inertia::render('Admin/Taxas/Show', [
            'taxa' => $taxa,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Taxa $taxa)
    {
        return Inertia::render('Admin/Taxas/Edit', [
            'taxa' => $taxa,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Taxa $taxa)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'codigo' => 'required|string|max:255|unique:taxas,codigo,' . $taxa->id,
            'tipo_bem' => 'required|in:carro,imovel',
            'modalidade' => 'required|in:consorcio,financiamento',
            'tipo_taxa' => 'required|in:percentual,fixo',
            'valor' => 'required|numeric|min:0',
            'periodo' => 'nullable|string|in:mensal,anual,unico',
            'descricao' => 'nullable|string',
            'ativo' => 'boolean',
        ]);

        $taxa->update($validated);

        return redirect()->route('admin.taxas.index')
            ->with('success', 'Taxa atualizada com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Taxa $taxa)
    {
        $taxa->delete();

        return redirect()->route('admin.taxas.index')
            ->with('success', 'Taxa excluída com sucesso!');
    }

    /**
     * Toggle ativo status
     */
    public function toggleAtivo(Taxa $taxa)
    {
        $taxa->update(['ativo' => !$taxa->ativo]);

        return back()->with('success', 'Status atualizado com sucesso!');
    }
}
